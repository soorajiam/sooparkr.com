---
title: "Anonymous Functions in Python (Lambda)"
date: "2020-06-22"
author: "Sooraj Parakkattil Ravi"
summary: "Demystifying anonymous functions in Python, their syntax, limit cases, and practical uses with map, filter, and sort."
tags: ["Python", "Functional Programming", "Backend"]
---

# Anonymous Functions in Python (Lambda)

In Python, an anonymous function is a function defined without a name. While standard functions are defined using the `def` keyword, anonymous functions are defined using the `lambda` keyword. Thus, they are commonly referred to as **lambda functions**.

## Syntax

The syntax for a lambda function is simple and compact:

```python
lambda arguments: expression
```

- A lambda function can take any number of arguments, but it can only have **a single expression**.
- The expression is evaluated and automatically returned.

Let's compare a standard function with a lambda function that adds 10 to a number:

### Standard function:
```python
def add_ten(x):
    return x + 10

print(add_ten(5)) # Output: 15
```

### Lambda function:
```python
add_ten_lambda = lambda x: x + 10

print(add_ten_lambda(5)) # Output: 15
```

## Practical Use Cases

Lambda functions are best utilized when you need a throwaway function for a short period, typically as arguments to higher-order functions like `filter()`, `map()`, or custom sort keys.

### 1. Filtering Lists with `filter()`
The `filter()` function extracts elements from an iterable for which a function returns `True`.

```python
numbers = [1, 5, 4, 6, 8, 11, 3, 12]
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
print(even_numbers) # Output: [4, 6, 8, 12]
```

### 2. Transforming Lists with `map()`
The `map()` function applies a function to all elements of an iterable.

```python
numbers = [1, 2, 3, 4, 5]
doubled_numbers = list(map(lambda x: x * 2, numbers))
print(doubled_numbers) # Output: [2, 4, 6, 8, 10]
```

### 3. Custom Sorting with `sorted()`
Lambda functions are highly useful for sorting complex data structures (like lists of dictionaries or tuples).

```python
students = [
    {"name": "Alice", "grade": 88},
    {"name": "Bob", "grade": 95},
    {"name": "Charlie", "grade": 90}
]

# Sort by grade descending
sorted_students = sorted(students, key=lambda s: s["grade"], reverse=True)
print(sorted_students)
# Output: [{'name': 'Bob', 'grade': 95}, {'name': 'Charlie', 'grade': 90}, ...]
```

## Limitations of Lambdas

1. **Single Expression Only**: You cannot include statements (like `print()`, `raise`, or multiple `for` loops) inside a lambda function.
2. **Readability Issues**: If a lambda function exceeds one line or has nested logic, it is always better to define a standard function using `def`.
