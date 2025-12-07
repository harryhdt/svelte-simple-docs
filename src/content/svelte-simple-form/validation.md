---
title: Validation
description: Validation of Svelte Simple Form
section: Svelte Simple Form
---

Svelte Simple Form provides a flexible validation system that works on two levels:

- **Field validation** — runs when a specific field changes
- **Form validation** — runs before submit to validate all fields at once

A validator must provide two functions:

```ts
validator: {
  validateField(field, form) {
    // Validate single field
    // Use form.setError(field, errors)
    // or form.removeError(field)
    return true; // or false
  },
  validateForm(form) {
    // Validate all fields
    // Use form.setErrors(allErrors)
    return true; // or false
  },
},
```

Validation results are applied using:

- `form.setError(field, errors)` → set errors for a single field
- `form.removeError(field)` → clear errors for a single field
- `form.setErrors(errors)` → set all errors at once

To make validation easier, we provide validator package.

---

## Standard Schema Validator

Supports **Zod**, **Valibot**, and other libraries that implement **Standard Schema**.

#### Installation

```bash
npm install @svelte-simple-form/validators
```

#### Usage Standard Schema

```ts
import z from "zod";
import { useForm } from "svelte-simple-form";
import { standardSchemaValidator } from "@svelte-simple-form/validators/standard-schema";

const schema = z.object({
  name: z.string().min(3),
  email: z.email(),
  age: z.number().min(10),
});

const { form } = useForm({
  initialValues: {
    name: "",
    email: "",
    age: "",
  },
  validator: standardSchemaValidator(schema),
  onSubmit: async (values) => {
    console.log(values);
  },
});
```

> Feel free to contribute to the validator package.
> <br>
> The Standard Schema validator is just one example — it supports Zod, Valibot, and any library that implements the Standard Schema specification.  
> Contributions, **improvements**, and **additional adapters** are welcome!
