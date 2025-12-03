---
title: Breaking changes
description: Breaking changes of Svelte Simple Form
section: Svelte Simple Form
---

# 0.2.5 => 0.3.0

## 1. Validation

Previously, validation was configured like this:

```ts
...
validation: { zod: schema }
...
```

Starting from the new version, the `validation` option has been **removed**.
Validation is now fully manual and handled through `onChange` and `onSubmit`:

```ts
...
onChange: (field) => {
  const err = validator.validateField(field, form.data);
  if (err) form.setError(field, err);
  else form.removeError(field);
},
...
onSubmit: async (values) => {
  const errors = validator.validateForm(values);
  if (Object.keys(errors).length) {
    form.errors = errors;
    return;
  }
  ...
  // API Action
  ...
}
...
```

This gives you complete freedom to use any validation library (Zod, Valibot, custom logic, etc.) without being locked into built-in helpers.

For more details, see the validation documentation:
[Validation Documentation](/svelte-simple-form/validation)
