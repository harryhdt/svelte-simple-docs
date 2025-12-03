---
title: Validation
description: Validation of Svelte Simple Form
section: Svelte Simple Form
---

The core idea of validation in this library is simple,

You handle validation inside **onChange** and **onSubmit**, right before performing any API action.  
Of course, you are fully free to customize the behavior however you like.

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

You can also trigger validation for additional fields inside onChange when needed:

```ts
onChange: (field) => {
  const err = validator.validateField(field, form.data);
  if (err) form.setError(field, err);
  else form.removeError(field);
  if (field === 'password') {
    const newField = 'confirmPassword';
    if (!form.touched.confirmPassword) return;
    const err = validator.validateField(newField, form.data);
    if (err) form.setError(newField, err);
    else form.removeError(newField);
  }
},
```

This approach gives you full control over how validation works — no restrictions, no enforced rules.
You decide the logic. You stay in control.

You can use **any validation library** you like — or even write your own manually.  
Below are **two examples**:

1. Manual validation
2. Zod validation

Use whichever matches your project needs.

---

## 1. Manual Validation

### Manual Validator Function

```ts
export function manualValidator(
  rules: Record<
    string,
    (value: any, values: any) => string[] | string | undefined
  >
) {
  return {
    validateForm(values: any) {
      const errors: Record<string, string[]> = {};

      for (const field in rules) {
        const res = rules[field](values[field], values);

        if (res) {
          errors[field] = Array.isArray(res) ? res : [res];
        }
      }

      return errors;
    },

    validateField(field: string, values: any) {
      const rule = rules[field];
      if (!rule) return undefined;

      const res = rule(values[field], values);
      if (!res) return undefined;

      return Array.isArray(res) ? res : [res];
    },
  };
}
```

### Usage of Manual validator

```ts
const validator = manualValidator({
  name: (v) => {
    if (!v) return "Name is required";
    if (v.length < 1) return "Name is required";
  },
  email: (v) => {
    if (!v) return "Email is required";
    if (!v.includes("@")) return "Invalid email address";
  },
  age: (v) => {
    if (!v) return "Age is required";
    if (v < 18) return "Must be at least 18";
  },
});

const { form } = useForm({
  initialValues: { name: "John", email: "", age: 10 },

  onChange: (field) => {
    const err = validator.validateField(field, form.data);
    if (err) form.setError(field, err);
    else form.removeError(field);
  },

  onSubmit: async (values) => {
    const errors = validator.validateForm(values);
    if (Object.keys(errors).length) {
      form.errors = errors;
      return;
    }

    console.log("submitted", values);
  },
});

// FYI: form.reset() resets all values AND errors
```

---

## 2. Zod Validation

### Zod Validator Function

```ts
import type { ZodTypeAny } from "zod";

export function zodValidator(schema: ZodTypeAny) {
  return {
    validateForm(values: any) {
      const res = schema.safeParse(values);
      if (res.success) return {};

      const errors: Record<string, string[]> = {};

      for (const issue of res.error.issues) {
        const key = issue.path.join(".") || "_form";
        if (!errors[key]) errors[key] = [];
        errors[key].push(issue.message);
      }

      return errors;
    },

    validateField(field: string, values: any) {
      const allErrors = this.validateForm(values);
      return allErrors[field];
    },
  };
}
```

### Usage

```ts
const schema = z
  .object({
    password: z.string().min(6, "Min 6 chars"),
    confirmPassword: z.string().min(6, "Min 6 chars"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const validator = zodValidator(schema);

const { form } = useForm({
  initialValues: { password: "", confirmPassword: "" },

  onChange: (field) => {
    const err = validator.validateField(field, form.data);
    if (err) form.setError(field, err);
    else form.removeError(field);

    // Revalidate confirmPassword when password changes
    if (field === "password") {
      const related = "confirmPassword";
      const err = validator.validateField(related, form.data);
      if (err) form.setError(related, err);
      else form.removeError(related);
    }
  },

  onSubmit: async (values) => {
    const errors = validator.validateForm(values);
    if (Object.keys(errors).length) {
      form.errors = errors;
      return;
    }

    console.log("submitted", values);
  },
});
```

---

## Create Your Own Validator

You are free to build validators using any library such as:

- Zod
- Yup
- Valibot
- Etc
- or your own custom logic

Your form flow will still work the same, also you already know the logic.
