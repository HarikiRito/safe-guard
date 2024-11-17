# Introduction

A simple utility function to handle errors in a more readable way and fully type-safe. It is inspired by the Go language error handling mechanism.

# Usage

```typescript
import {guardAsync, guardSync} from "./index";

const result = await guardAsync(Promise.resolve({x: 1}))

if (!result.hasData()) {
  // Do the error handling here
  return;
}

// Because we handling the error above, we can safely access the data and it will be fully type-safe
const x = result.data.x;

// It is the same with the synchronous version
const syncResult = guardSync({x: 1})

if (!syncResult.hasData()) {
  // Do the error handling here
  return;
}

// Fully type-safe
const syncX = syncResult.data.x;

// For the case of the error handling, here is how you can do it

const errorResult = await guardAsync(Promise.reject(new Error("An error occurred")))

// The result will now have the error object and the data will be undefined
if (!errorResult.hasData()) {
  // Do the error handling here
  console.error(errorResult.error);
  return;
}
```