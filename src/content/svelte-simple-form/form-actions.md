---
title: Form actions
description: Form actions of Svelte Simple Form
section: Svelte Simple Form
---

In SvelteKit, a `+page.server.js` file can export **actions**, which allow you to POST data to the server using a standard `<form>` element.

Learn more here:  
https://svelte.dev/docs/kit/form-actions

---

**Svelte Simple Form is not specifically designed for SvelteKit Form Actions.**  
The library’s API is intended for simple client-side form usage or API-based submissions.

However, if you still want to integrate it with SvelteKit Form Actions, you _can_ align both approaches using **Progressive Enhancement**.

SvelteKit provides the `use:enhance` directive for this purpose:  
https://svelte.dev/docs/kit/form-actions#Progressive-enhancement

With `use:enhance`, you can keep using Svelte Simple Form on the client side while still benefiting from SvelteKit’s server-side form handling when needed.
