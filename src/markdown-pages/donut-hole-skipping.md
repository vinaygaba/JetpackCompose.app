---
slug: "/articles/donut-hole-skipping-in-jetpack-compose"
title: "What is “donut-hole skipping” in Jetpack Compose?"
date: 2021-09-08
description: "🍩 Learn how Jetpack Compose is able to be smart during recompositions!"
authorName: "Vinay Gaba"
authorProfileUrl: "https://twitter.com/vinaygaba"
authorImageUrl: "https://jetpackcompose.app/vinay_gaba_profile_picture.jpeg"
heroImageUrl: "/articles/donut-hole-skipping/donut-hole-skipping-hero.png"
tags:
  - Recomposition
  - Donut-hole
  - Optimization
  - State
---

I recently stumbled on a term that was brought up in a few conversations related to Jetpack Compose. It's being referred to as “donut-hole skipping” . The name certainly intrigued me enough to go down the rabbit hole, or in this case, the donut hole 🍩 Given how early we are in the Jetpack Compose journey, I think it would be valuable to cover some basic concepts to get everyone at the same baseline before we _dough_ into the more interesting bits.

# Recomposition

> Recomposition is the process of calling your composable functions again when inputs change. This happens when the function's inputs change. When Compose recomposes based on new inputs, it only calls the functions or lambdas that might have changed, and skips the rest. By skipping all functions or lambdas that don't have changed parameters, Compose can recompose efficiently.

At a high level, anytime the inputs or the state of a `@Composable` function changes, it would be valuable for the function to be invoked again so that the latest changes are reflected. This behavior is critical to how Jetpack Compose works and is also what makes it so powerful as this reactive nature is a first class citizen of the framework. If I were to oversimplify this (like really oversimplify!), anyone familiar with the classic Android View system might remember a method called `invalidate()` that was used to ensure that the latest state of the `View` was represented on the screen.

This is effectively what recomposition is responsible for as well with an important nuance - it's much smarter than the previous UI toolkit as it will avoid redundant work when possible using smart optimizations. In addition, this happens automatically so you don't need to call any methods for this to happen. With that said, let's look at some examples of recomposition in action and hopefully it will lead us to the sugary delight optimization that I spoke about at the start of this post.

## Example 1

```kotlin
@Composable
fun MyComponent() {
    val counter by remember { mutableStateOf(0) }
    CustomText(
        text = "Counter: $counter",
        modifier = Modifier
            .clickable {
                counter++
            },
    )
}

@Composable
fun CustomText(
    text: String,
    modifier: Modifier,
) {
    Text(
        text = text,
        modifier = modifier.padding(32.dp),
        style = TextStyle(
            fontSize = 20.sp,
            textDecoration = TextDecoration.Underline,
            fontFamily = FontFamily.Monospace
        )
    )
}
```

We created a simple composable function called `MyComponent` that initializes a state object to hold the value of `counter`. This value is rendered by the `Text` composable and every time you tap on this text, counter is incremented. What we are interested to see is which parts of this function are reinvoked. In order to investigate this further, we are going to use log statements. But we want to trigger these log statements only when recompositions are happening. This sounds like the perfect use case for [SideEffect](https://developer.android.com/jetpack/compose/side-effects#sideeffect-publish), a composable function that is reinvoked on every successful recomposition. Since we need to use this in a few places, let's write a helper function that will be useful for this investigation across all the examples. I'd like to credit my friend [Sean McQuillan](https://twitter.com/objcode) for the code snippet below 🙏

```kotlin
class Ref(var value: Int)

// Note the inline function below which ensures that this function is essentially
// copied at the call site to ensure that its logging only recompositions from the
// original call site.
@Composable
inline fun LogCompositions(tag: String, msg: String) {
    if (BuildConfig.DEBUG) {
        val ref = remember { Ref(0) }
        SideEffect { ref.value++ }
        Log.d(tag, "Compositions: $msg ${ref.value}")
    }
}
```

Let's make use of this helper function in our example and give it a spin!

```diff
@Composable
fun MyComponent() {
    val counter by remember { mutableStateOf(0) }

+   LogCompositions("JetpackCompose.app", "MyComposable function")

    CustomText(
        text = "Counter: $counter",
        modifier = Modifier
            .clickable {
                counter++
            },
    )
}

@Composable
fun CustomText(
    text: String,
    modifier: Modifier = Modifier,
) {
+   LogCompositions("JetpackCompose.app", "CustomText function")

    Text(
        text = text,
        modifier = modifier.padding(32.dp),
        style = TextStyle(
            fontSize = 20.sp,
            textDecoration = TextDecoration.Underline,
            fontFamily = FontFamily.Monospace
        )
    )
}
```

On running this example, we notice that both `MyComponent` & `CustomText` are recomposed every time the value of the counter changes. We'll keep this in mind and look at another example so that we can compare the behavior and hopefully derive some insights 🤞🏻

![Example 1](/articles/donut-hole-skipping/donut-hole-skipping-example-1.gif)

## Example 2

```diff
@Composable
fun MyComponent() {
    val counter by remember { mutableStateOf(0) }

    LogCompositions("JetpackCompose.app", "MyComposable function")

+   Button(onClick = { counter++ }) {
+       LogCompositions("JetpackCompose.app", "Button")
        CustomText(
            text = "Counter: $counter",
-            modifier = Modifier
-                .clickable {
-                    counter++
-                },
        )
+   }
}
```

We are reusing our previous example with a small difference - we introduce a `Button` composable to handle our click logic and moved the `CustomText` function inside the scope of the `Button` function. We also added a log statement inside the scope of the Button function to check if that lambda is being executed. Let's run this example and monitor the log statements.

![Example 2](/articles/donut-hole-skipping/donut-hole-skipping-example-2.gif)

Here's where things start to get really interesting. We see that the body of `MyComponent` was executed during the very first composition along with the body of the `Button` composable and the`CustomText` composable. However, every subsequent recomposition only causes the `Button` and the `CustomText` composable to be invoked again while the body of `MyComponent` is skipped altogether. Interesting..... 🤔

# Recomposition Scope

In order to understand how Compose is able to optimize recompositions, it is important to take into account the scopes of the composable functions that we are using in our examples. Compose keeps track of these composable scopes under-the-hood and divides a Composable function into these smaller units for more efficient recompositions. It then tries its best to only recompose the scopes that are reading the values that can change. In order to wrap our heads around what this means, let's use this lens and look at both our examples again. This time, we'll take into account the scopes that are available for the Compose runtime to do its book-keeping.

![Example 1](/articles/donut-hole-skipping/example1-scope.png)
_Example 1 with its recomposition scopes_

We see that there's a couple lambda scopes at play in the first example i.e the scope of the `MyComponent` function and the scope of `CustomText` function. Furthermore, `CustomText` is in the lambda scope of the `MyComponent` function. When the value of the the counter changes, we previously noticed that both these scopes were being reinvoked and here's why -

- `CustomText` is recomposed because its text parameter changed as it includes the counter value. This makes sense and is probably what you want anyway.
- `MyComponent` is recomposed because its lambda scope captures the counter state object and a smaller lambda scope wasn't available for any recomposition optimizations to kick in.

Now you might wonder what I meant when I said "a smaller lambda scope wasn't available". Hopefully the next example will make this clear!

![Example 2](/articles/donut-hole-skipping/example2-scope.png)
_Example 2 with its recomposition scopes_

In this example, we previously noticed that only `Button` and `CustomText` were reinvoked when the value of counter updated and `MyComponent` was skipped altogether. Here are some of our observations when we look at this example -

- Even though the initialization of the counter is in the scope of `MyComponent`, it doesn't read its value, at least not directly in the parent scope.
- The `Button` scope is where the value of counter is read and passed to the `CustomText` composable as an input

Since the compose runtime was able to find a smaller scope (Button scope) where the value of the counter was being read, it skipped invoking the `MyComponent` scope and only invoked the `Button` scope (where the value is being read) & the `CustomText` scope (as its input changed). In fact, it also skipped invoking the `Button` composable (it invoked its scope, not the Button composable itself).

# What does a donut have to do with all this?

Let's get to why you opened this article in the first place - what do donuts have to do with all this? I'm about to say something that is going to blow your mind. Composable functions can be thought to be made up of donuts that are internally made up of smaller donuts 🍩. At least that's the metaphor the Compose team has been using to describe the optimizations related to recompositions. The composable function itself can be though to represent the donut, whereas its scope is the donut hole. Whenever possible, the Compose runtime skips running the "donut" if its not reading the value that changed (assuming its input didn't change either) and will only run the "donut-hole" (i.e its scope, assuming that's where the value is being read).

Let's visualize the composables in example 2 with this lens and see how they are being recomposed. Anything with the chequered pattern represents that it was recomposed.

![1](/articles/donut-hole-skipping/recomposition-donut.png)
_State before any of these functions are composed_
<br/>

![2](/articles/donut-hole-skipping/recomposition-donut-counter-0.png)
_Counter = 0 First composition, all composable functions and their scopes are executed and composed_

<br/>

![3](/articles/donut-hole-skipping/recomposition-donut-counter-1.png)
_Counter = 1 Only Button Scope and CustomText, & CustomText Scope are recomposed. MyComponent, MyComponent Scope & Button are skipped from recomposition._
<br/>

![4](/articles/donut-hole-skipping/recomposition-donut-counter-2.png)
_Counter = 1 Only Button Scope and CustomText, & CustomText Scope are recomposed. MyComponent, MyComponent Scope & Button are skipped from recomposition._
<br/>

Hopefully this visualization was clear to get the point across so I'm going to avoid adding more words to this already long post.

And this, folks, is why this optimization by Compose is referred to as “donut-hole skipping”.

# Summary

As you could see, Jeptack Compose tries hard to avoid doing unnecessary work where possible. However, the onus is on the developers to be good citizens of the framework. You can do this by giving [Compose extra information](https://developer.android.com/jetpack/compose/lifecycle#add-info-smart-recomposition) to be able to do these optimizations and following some of the [rules of recomposition](https://developer.android.com/jetpack/compose/mental-model#recomposition) listed in the documentation. If you are interested in reading more about topics related to recomposition and state, my good friend [Zach Klippenstein](https://twitter.com/zachklipp) has a [few blog posts](https://dev.to/zachklipp/scoped-recomposition-jetpack-compose-what-happens-when-state-changes-l78) that are worth checking out.

<br>

I hope I was able to teach you something new today. There's more articles in the pipeline that I'm excited to share with y'all and if you are interested in getting early access to them, consider signing up to the newsletter that's linked below. Until next time!

\--

[Vinay Gaba](https://twitter.com/vinaygaba) <br/>
