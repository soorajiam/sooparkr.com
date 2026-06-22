---
title: "Deep Dive into Vue 3 Reactivity: Proxies & Render Loops"
date: "2026-01-20"
author: "Sooraj Parakkattil Ravi"
summary: "How Vue 3's Proxy-based reactivity system enables high-performance real-time UI components and interactive client state management."
tags: ["Vue 3", "Frontend", "Reactivity", "JavaScript"]
---

# Deep Dive into Vue 3 Reactivity: Proxies & Render Loops

Vue 3 introduced a completely rewritten reactivity engine built on ES6 `Proxy` objects, moving away from Vue 2's `Object.defineProperty`. This change fundamentally improved performance, simplified developer ergonomics, and unlocked new capabilities. In this post, we explore how this system works under the hood and how we can use it to build complex frontend applications.

## How Proxy Reactivity Works

In Vue 2, properties had to be declared upfront so Vue could define getters and setters on them. With Vue 3's `reactive()` and `ref()`, Vue wraps objects in a proxy handler:

```javascript
const original = { count: 0 };
const state = new Proxy(original, {
  get(target, key, receiver) {
    // Track dependency
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    // Trigger update
    trigger(target, key);
    return result;
  }
});
```

Because of this:
- **Dynamic properties** are supported natively. If you add a new property to a reactive object, Vue intercepts the set action and triggers re-renders automatically.
- **Array mutations** are tracked naturally without overriding prototype methods.
- **Set, Map, and WeakMap** collections are fully reactive.

## Case Study: The API Client simulator

In our portfolio website, we manage complex local states for:
- API endpoint history.
- Network latency simulation (handling load states, progress indicators).
- Visualizer configurations.

By utilizing Vue 3's Composition API (`ref`, `computed`, `watchEffect`), we synchronize our API request pane with the visualizer and code pane seamlessly.

```html
<script setup>
import { ref, computed } from 'vue';

const selectedEndpoint = ref('/api/v1/profile');
const responseData = ref(null);
const isLoading = ref(false);

const formattedJson = computed(() => {
  return responseData.value ? JSON.stringify(responseData.value, null, 2) : '';
});
</script>
```

Using this reactive flow, any changes to the active endpoint immediately update the inputs, and resolving the simulated network request triggers smooth animations inside the visualizer without manual DOM manipulation.
