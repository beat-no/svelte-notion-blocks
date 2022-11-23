<script lang="ts">
	import type { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
	import Caption from '$lib/blocks/Caption.svelte';

	export let block: ImageBlockObjectResponse;

    $: src = block.image.external?.url ?? block.image.file?.url;
</script>

<Caption caption={block.image.caption}>
	<img {src} />
</Caption>

<style>
	img {
		max-width: 100%;
	}
</style>
