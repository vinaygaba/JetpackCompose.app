---
slug: "/articles/donut-hole-skipping-in-jetpack-compose"
title: "What is “donut-hole skipping” in Jetpack Compose?"
date: 2021-09-04
description: "🍩 Learn how Jetpack Compose is able to be smart during recomposition!"
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

I recently stumbled on a term that was brought up in a few conversations related to Jetpack Compose. It's being referred to as “donut-hole skipping” . The name certainly intrigued me enough to go down the rabbit hole, or in this case, the donut hole 🍩 Given how early we are in the Jetpack Compose journey, I think it would be valuable to cover some basic concepts to get everyone at the same baseline before we dough (😉) into the more interesting bits.

# Recomposition

> Recomposition is the process of calling your composable functions again when its inputs change

At a high level, anytime the inputs or the state of a `@Composable` function changes, it would be valuable for the function to be invoked again so that the latest changes are reflected. This behavior is critical to how Jetpack Compose works and is also what makes it so powerful as this reactive nature is a first class citizen of the framework. If I were to oversimplify this, anyone familiar with the classic Android View system might remember a method called `invalidate()` that was used to ensure that the latest state of the `View` was represented on the screen.

This is effectively what recomposition is responsible for as well with an important nuance - it's much smarter than the previous UI toolkit as it will avoid redundant work when possible using smart optimizations. With that said, let's look at some examples of recomposition in action and hopefully it will lead us to this hunger inducing optimization that I spoke about at the start of this post.

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
_TODO: Example 1_

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
_TODO: Example 2_

Here's where things start to get really interesting. We see that the body of `MyComponent` was executed during the very first composition along with the body of the `Button` composable and the`CustomText` composable. However, every subsequent recomposition only causes the `Button` and the `CustomText` composable to be invoked again while the body of `MyComponent` is skipped altogether. Interesting..... 🤔

# Recomposition Scope

In order to understand how Compose is able to optimize recompositions, it is important to take into account the scopes of the functions that we are using in our examples. Compose keeps track of these scopes under-the-hood and divides a Composable function into these smaller units for more efficient recompositions. In order to wrap our heads around what this means, let's look at both our examples again and understand the scopes that are available for the Compose runtime to do its book-keeping.

![Example 1](/articles/donut-hole-skipping/example1-scope.png)
_TODO_

We see that there's a couple lambda scopes at play in the first example i.e the scope of the `MyComponent` function and the scope of `CustomText` function. Furthermore, `CustomText` is in the lambda scope of the `MyComponent` function. When the value of the the counter changes, we previously noticed that both these scopes were being reinvoked and here's why -

- `CustomText` is recomposed because its text parameter changed as it includes the counter value. This makes sense and is probably what you want anyway.
- `MyComponent` is recomposed because its lambda scope captures the counter state object and a smaller lambda scope wasn't available for any recomposition optimizations to kick in.

Now you might wonder what I mean when I say "a smaller lambda scope wasn't available" and the next example will make this clear.

![Example 2](/articles/donut-hole-skipping/example2-scope.png)
_TODO_

In this example, we previously noticed that only `Button` and `CustomText` composables were invoked when the value of counter updated and `MyComponent` was skipped altogether.
