<script lang="ts">
	import { DocsLayout } from "@svecodocs/kit";
	import { navigation } from "$lib/navigation";

	let { children } = $props();
</script>

<DocsLayout {navigation}>
	{#snippet logo()}
		<p class="text-lg font-bold"><span class="text-orange-600">Svelte</span> Simple <span class="text-blue-500">*</span></p>
	{/snippet}

	{@render children?.()}
</DocsLayout>
