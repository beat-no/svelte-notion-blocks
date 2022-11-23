<script lang="ts">
	import RichText from '$lib/blocks/RichText.svelte';
	import type { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

    export let caption: RichTextItemResponse[]|undefined;
</script>

<figure class="caption">
    <slot />
	{#if !!caption}
		<figcaption><RichText texts={caption} /></figcaption>
	{/if}
</figure>