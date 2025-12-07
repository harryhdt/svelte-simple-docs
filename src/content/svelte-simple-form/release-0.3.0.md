---
title: Release 0.3.0
description: Release version 0.3.0 of Svelte Simple Form
section: Svelte Simple Form
---

# Version 0.3.0

This release focuses on improving validation flexibility and TypeScript support, while simplifying core features.

---

## 🚀 New Features

### 1. `setErrors`

You can now set multiple errors at once — useful when validating the entire form:

```ts
form.setErrors({
  name: ["Required"],
  email: ["Invalid email"],
});
```

### 2. Validation API Improvements

The new validator system gives you **full control**.
<br>
You can now write your own validator or use libraries like **Zod**, **Yup**, **Valibot**, etc.

Each validator simply returns:

```ts
{
  validateField(field, form),
  validateForm(form),
}

```

See full details here:
[Validation Documentation](/svelte-simple-form/validation)

## ⚠️ Breaking Changes

### 1. Removal of `validation` Option

Before

```ts
useForm({
  validation: { zod: schema },
});
```

Now

```ts
useForm({
  validator: zodValidator(schema),
});
```

See for how to use `zodValidator`:
[Zod Validator Documentation](/svelte-simple-form/validation#1-zod)

This update provides:

- No library lock-in
- Ability to support multiple validation strategies
- Cleaner API
