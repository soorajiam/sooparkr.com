---
title: "List Comprehension in Python"
date: "2020-06-21"
author: "Sooraj Parakkattil Ravi"
summary: "A practical guide to writing cleaner, more readable, and efficient Python code using list comprehensions."
tags: ["Python", "Clean Code", "Algorithms"]
---

# List Comprehension in Python

List comprehension provides a concise and elegant syntax for creating new lists based on existing lists or iterables. It is often faster and much easier to read than traditional `for` loops.

## Basic Syntax

The basic template for a list comprehension is:

```python
new_list = [expression for item in iterable]
```

Let's compare a standard `for` loop with a list comprehension that squares a sequence of numbers:

### Using a traditional loop:
```python
numbers = [1, 2, 3, 4, 5]
squares = []
for n in numbers:
    squares.append(n ** 2)
print(squares) # Output: [1, 4, 9, 16, 25]
```

### Using List Comprehension:
```python
numbers = [1, 2, 3, 4, 5]
squares = [n ** 2 for n in numbers]
print(squares) # Output: [1, 4, 9, 16, 25]
```

## Adding Conditionals (Filtering)

You can extend list comprehensions with `if` statements to filter elements:

```python
new_list = [expression for item in iterable if condition]
```

For example, let's extract only the even numbers from a list:

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [n for n in numbers if n % 2 == 0]
print(evens) # Output: [2, 4, 6, 8, 10]
```

## Using `if-else` Conditions

If you need to map elements to different values based on a condition, you place the `if-else` statement **before** the `for` loop:

```python
new_list = [expression_if_true if condition else expression_if_false for item in iterable]
```

For instance, tagging numbers as "Even" or "Odd":

```python
numbers = [1, 2, 3, 4, 5]
tags = ["Even" if n % 2 == 0 else "Odd" for n in numbers]
print(tags) # Output: ['Odd', 'Even', 'Odd', 'Even', 'Odd']
```

## When to Avoid List Comprehension

While powerful, list comprehensions should not be overused. If your list comprehension contains complex nested logic, it is better to use a standard loop to maintain readability:

```python
# Avoid doing this (unreadable):
matrix = [[1, 2], [3, 4], [5, 6]]
flat_evens = [x for row in matrix for x in row if x % 2 == 0]
```

## Conclusion

List comprehensions are an essential Python tool. Use them to write clean, Pythonic code, but always prioritize readability over brevity.
