---
title: Release 0.3.1
description: Release version 0.3.1 of Svelte Simple Form
section: Svelte Simple Form
---

# Version 0.3.1

This release adds support for **async validation** and improves type safety for validators.

## 🚀 New Features

- **`form.isValidating`** – Indicates whether the form is currently validating.
- **`form.setIsValidating(value)`** – Manually set the validating state of the form.
- **`form.setIsValid(value)`** – Manually set the valid state of the form.

---

## 🐛 Fixes

- Validator `validateField` and `validateForm` – Corrected the type of `form`.
- Validator `validateField` and `validateForm` – Ensure return type is `boolean` or `Promise<boolean>`.
- `form.setErrors` – Fixed value type to properly accept error objects.

---

## ⚠️ Breaking Changes

- None
