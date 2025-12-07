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

### Examples

We have two example of validator

#### 1. Zod

Use a Zod schema to validate form input, here is basic example of `zodValidator`.

Validator function `zod.ts`:

```ts
import type { FormContext } from "svelte-simple-form";
import type { ZodType } from "zod";

export function zodValidator<T extends ZodType<any>>(
  schema: T,
  options:
    | {
        dependencies?: Partial<Record<string, string[]>>;
      }
    | undefined = undefined
) {
  function mapErrors(values: any) {
    const res = schema.safeParse(values);
    if (res.success) return {};
    const errors: Record<string, string[]> = {};
    for (const issue of res.error.issues) {
      const key = issue.path.join(".") || "_form";
      (errors[key] ??= []).push(issue.message);
    }
    return errors;
  }

  return {
    validateForm(form: FormContext) {
      form.setErrors({});
      const errors = mapErrors(form.data);
      if (Object.keys(errors).length) {
        form.setErrors(errors);
        return false;
      } else {
        return true;
      }
    },
    validateField(field: string, form: FormContext) {
      const allErrors = mapErrors(form.data);
      const deps = options?.dependencies?.[field] ?? [];
      const fieldsToCheck = [field, ...deps];
      let valid = true;
      for (const key of fieldsToCheck) {
        if (!form.touched[key]) continue;
        const errs = allErrors[key];
        if (errs && errs.length > 0) {
          valid = false;
          form.setError(key, errs);
        } else {
          form.removeError(key);
        }
      }
      return valid;
    },
  };
}
```

> This is a very simple example validator for Zod.
> <br>
> It validates the whole form even when only `one field` changes, so it may not be the most efficient solution for `large forms`.
> <br>
> You are welcome to create a more `optimized` version

Usage example:

```ts
const schema = z
  .object({
    name: z.string().min(1, "Required"),
    password: z.string().min(6, "Min 6 chars"),
    confirmPassword: z.string().min(6, "Min 6 chars"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const { form } = useForm({
  initialValues: { name: "", password: "", confirmPassword: "" },
  validator: zodValidator(schema, {
    dependencies: {
      password: ["confirmPassword"],
      confirmPassword: ["password"],
    },
  }),
  onSubmit: async (values) => {
    console.log("submitted", values);
  },
});
```

> 💡 Use dependencies to revalidate related fields
> (e.g. password + confirmPassword)

#### 2. Manual

Define your own validation rules using simple functions, here is basic example of `manualValidator`.

Validator function `manual.ts`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormContext } from "svelte-simple-form";

export function manualValidator<
  T extends Record<string, (value: any, allValues: any) => string | undefined>
>(
  rules: T,
  options?:
    | {
        dependencies?: Partial<Record<keyof T & string, (keyof T & string)[]>>;
      }
    | undefined
) {
  function mapErrors(values: any) {
    const errors: Record<string, string[]> = {};

    for (const key in rules) {
      const rule = rules[key];
      const message = rule(values[key], values);
      if (message) {
        (errors[key] ??= []).push(message);
      }
    }

    return errors;
  }

  return {
    validateForm(form: FormContext) {
      form.setErrors({});
      const errors = mapErrors(form.data);
      if (Object.keys(errors).length) {
        form.setErrors(errors);
        return false;
      }
      return true;
    },

    validateField(field: string, form: FormContext) {
      const allErrors = mapErrors(form.data);
      const deps = options?.dependencies?.[field] ?? [];
      const fieldsToCheck = [field, ...deps];

      let valid = true;

      for (const key of fieldsToCheck) {
        if (!form.touched[key]) continue;

        const errs = allErrors[key];
        if (errs && errs.length > 0) {
          valid = false;
          form.setError(key, errs);
        } else {
          form.removeError(key);
        }
      }

      return valid;
    },
  };
}
```

Usage example:

```ts
const { form } = useForm({
  initialValues: { name: "", password: "", confirmPassword: "" },
  validator: manualValidator(
    {
      name: (v) => {
        if (!v) return "Required";
        if (v.length < 1) return "Required";
      },
      password: (v) => {
        if (!v) return "Required";
        if (v.length < 6) return "Min 6 chars";
      },
      confirmPassword: (v, all) => {
        if (!v) return "Required";
        if (v !== all.password) return "Passwords do not match";
      },
    },
    {
      dependencies: {
        password: ["confirmPassword"],
        confirmPassword: ["password"],
      },
    }
  ),
  onSubmit: async (values) => {
    console.log("submitted", values);
  },
});
```

This is great if you don’t want to rely on an external library.

---

### Use with Other Validation Libraries

The validator API is fully flexible.
You can integrate any validation library — such as:

- Yup
- Superstruct
- Vest
- Valibot
- Joi (browser compatible versions)
- etc.

All you need to do is:

1. Parse your form data using the library’s validation method
2. Convert the validation result to a simple error map
3. Update the form using form.setError, form.removeError, or form.setErrors

This means you are free to choose (or build) the validation strategy that fits your needs.
