---
slug: "/writing/my-first-post"
title: "My first blog post"
---

The first topic of the series is something that forms the basis of how we write code - data structures.

> A data structure is a particular way of organizing data in a computer so that it can be used efficiently.

This blog post focuses on Data Structures that the Android run time system provides in order to make your apps more efficient. These data structures were built keeping Android in mind and hence the knowledge of these are essential for every Android developer.

# ArrayMap

[ArrayMap](https://developer.android.com/reference/android/support/v4/util/ArrayMap.html) is a generic key->value data structure that is similar to HashMap in functionality but is meant to be more memory efficient.

Let's dive into the internals of an ArrayMap. The ArrayMap contains two small arrays instead of one that is seen in the case of a HashMap. The first array contains the hashes of the given keys in sorted order. The second array stores the key and value objects in a contiguous fashion based on the ordering of the first array.

<!-- ![ArrayMap](https://blog.vinaygaba.com/images/ArrayMap.png) -->

When the value for a key needs to be fetched, the key is first hashed and that hash is binary searched to find the index of that hash. This index is then used to find the location of the key and value in the interwoven array.

```java
Key Index = (HashIndex * 2) + 1
```

Example usage:

```java
ArrayMap<String, String> arrayMap = new ArrayMap<String, String>();
arrayMap.put("key", "value");
String value = arrayMap.get("key");
```

If the key does not match the key we were searching the value for, a linear search is performed in both the directions as it is assumed this was a case of collision.As the number of objects grow, so does the time to access a single object. Hence, the tradeoff is between smaller memory overhead for more expensive runtime access. Another advantage of using an ArrayMap over a HashMap is that it allows iteration over the collection using indexing which is not possible when using a HashMap. If the key does not match the key we were searching the value for, a linear search is performed in both the directions as it is assumed this was a case of collision.As the number of objects grow, so does the time to access a single object. Hence, the tradeoff is between smaller memory overhead for more expensive runtime access. 

```java
for(int i = 0; i < arrayMap.size(); i++) {
  String key = arrayMap.keyAt(i);
  String value = arrayMap.valueAt(i);
}
```

As you might remember from this Android Performance Patterns episode, [To Index or Iterate?](https://www.youtube.com/watch?v=MZOf3pOAM6A), using the index to iterate over a collection is more performant compared to using an iterator.

## When to use ArrayMap?

It is suitable to use ArrayMaps in the following situations:

- When there are < 1000 objects in the collection
- When insertion and deletions are infrequent.
- When there are nested maps and sub maps have lower number of items and you often iterate over them.

# SparseArray

# The Next Morning

Autoboxing could be a huge memory problem for your applications. One of the largest causes of Autoboxing issues are HashMap containers. HashMap's enforce you to use objects instead of primitives. Autoboxing also happens when you fetch a primitive object from a primitive container. Example :

```java
HashMap<String, Integer> map = new HashMap<String, Integer>();
int value = map.get("key");
```

In addition, generic objects are much larger in size than their primitive counterparts. For example an Integer takes 16 bytes of space whereas its primitive counterpart takes just 4 bytes. Hence it would be much more efficient if you could use primitives as either keys or values in collections.

The [SparseArray](https://developer.android.com/reference/android/util/SparseArray.html) family of data structures aims to do just that. The Android run time provides this class to use primitives instead of generics as keys or values. The following classes are available in Android:

<!-- <table>
  <tr>
    <td>SparseBooleanArray</td>
    <td> (int, boolean) </td>
  </tr>

  <tr>
    <td>SparseArray</td>
    <td> (int, obj) </td>
  </tr>

  <tr>
    <td>SparseLongArray</td>
    <td> (int, long) </td>
  </tr>

  <tr>
    <td>LongSparseArray</td>
    <td> (long, obj) </td>
  </tr>

  <tr>
    <td>SparseIntArray</td>
    <td> (int, int) </td>
  </tr>

</table> -->

Example usage:

```java
SparseArray sparseArray = new SparseArray();
sparseArray.put(1,"Android");

SparseLongArray sparseLongArray = new SparseLongArray();
sparseLongArray.put(1,1L);

SparseBooleanArray sparseBooleanArray = new SparseBooleanArray();
sparseBooleanArray.put(1,true);

SparseIntArray sparseIntArray = new SparseIntArray();
sparseIntArray.put(1,2);

LongSparseArray longSparseArray = new LongSparseArray();
longSparseArray.put(1L,"Android");
```

Similar to ArrayMaps, SparseArray's help in reducing the memory footprint. The internal of them are very similar as well and both of them contain two tightly packed arrays rather than one. It also makes use of binary search like in the case of ArrayMaps

## When to use SparseArray?

The SparseArray can be used for the same scenarios that you can use an ArrayMap for.Having said that, the main difference between SparseArray and ArrayMap is that the key object is always of primitive type in case of a SparseArray. This has two folds benefits as you save on memory and also avoid autoboxing.

# Creating your own Data Structure

It's possible that the existing data structures might not be sufficient for your use case. In such a scenario it would make sense to use something custom in order to make your app more memory efficient. One such example was what Facebook used in order to make the feeds(news feed, profiles, events, groups) in their main app to be more memory efficient. They noticed that inserting long values in a HashSet was resulting in memory leaks and so they decided to create a custom data structure called a LongArraySet which worked similar to a Set and used a LongSparseArray as the internal map instead of a HashMap. I would highly recommend reading that [article](https://code.facebook.com/posts/857070764436276/memory-optimization-for-feeds-on-android/). The source code for LongArraySet can be found [here](https://code.facebook.com/posts/973222319439596).