<script lang="ts">
	import type { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
	import RichText from '$lib/blocks/RichText.svelte';

	export let cell: RichTextItemResponse[];
	export let header: boolean;

	$: element = header ? 'th' : 'td';
</script>

<svelte:element this={element} class="cell">
	<RichText texts={cell} />
</svelte:element>