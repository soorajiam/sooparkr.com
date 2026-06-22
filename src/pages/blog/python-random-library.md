---
title: "Understanding Python's Random Library"
date: "2021-02-21"
author: "Sooraj Parakkattil Ravi"
summary: "Mastering pseudo-random number generation in Python, covering choices, shuffling, sampling, and seed control."
tags: ["Python", "Algorithms", "Backend"]
---

# Understanding Python's Random Library

Python's built-in `random` module is a powerful tool for generating pseudo-random numbers, selecting random choices, and shuffling sequences. It uses the **Mersenne Twister** algorithm under the hood, making it fast and suitable for simulation, but it is **not** cryptographically secure (for security purposes, use Python's `secrets` module instead).

In this article, we'll cover the most common functions provided by the library.

## Generating Numbers

### 1. `random.random()`
Generates a floating-point number between `0.0` (inclusive) and `1.0` (exclusive).

```python
import random

print(random.random()) # E.g., 0.3744383
```

### 2. `random.uniform(a, b)`
Generates a random floating-point number between `a` and `b`.

```python
print(random.uniform(1.5, 10.0)) # E.g., 6.843738
```

### 3. `random.randint(a, b)`
Generates a random integer between `a` and `b` (inclusive of both endpoints).

```python
print(random.randint(1, 6)) # E.g., 4 (useful for rolling a six-sided die)
```

## Selection and Sequences

### 1. `random.choice(sequence)`
Selects a random element from a non-empty sequence (like a list, tuple, or string).

```python
colors = ["red", "blue", "green", "yellow"]
print(random.choice(colors)) # E.g., "blue"
```

### 2. `random.choices(sequence, k)`
Returns a list of size `k` containing elements chosen randomly from the sequence **with replacement** (elements can be selected multiple times).

```python
print(random.choices(colors, k=2)) # E.g., ["red", "red"]
```

### 3. `random.sample(sequence, k)`
Returns a list of size `k` containing unique elements chosen randomly from the sequence **without replacement** (elements are not repeated).

```python
print(random.sample(colors, k=2)) # E.g., ["red", "green"]
```

### 4. `random.shuffle(list)`
Shuffles a list in-place. Note that this function mutates the original list.

```python
cards = [1, 2, 3, 4, 5]
random.shuffle(cards)
print(cards) # E.g., [3, 1, 5, 2, 4]
```

## Controlling Randomness (Seeding)

Computers generate pseudo-random numbers by applying mathematical equations to an initial starting number, called a **seed**. By default, Python uses the current system time as the seed. However, you can lock the seed to make your random sequences **reproducible**:

```python
random.seed(42)
print(random.randint(1, 100)) # Will always output 82
print(random.randint(1, 100)) # Will always output 15
```

Using a fixed seed is crucial in scientific experiments and testing to ensure that data runs are consistent and reproducible.
