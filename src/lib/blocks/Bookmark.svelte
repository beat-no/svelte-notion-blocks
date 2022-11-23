<script lang="ts">
	import type { BookmarkBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
	import Caption from '$lib/blocks/Caption.svelte';

	export let block: BookmarkBlockObjectResponse | { __meta: { title: string, description: string, image: string }};
    
    $: meta = block.__meta;
</script>

<Caption caption={block.bookmark.caption}>
	<a class="bookmark" href={block.bookmark.url}>
        {#if !!meta.image}
        <img src={meta.image} alt={meta.title} />
        {/if}
		<h4>{meta.title}</h4>
        {#if !!meta.description}
        <p class="description">{meta.description}</p>
        {/if}

        <p class="url">{block.bookmark.url}</p>
	</a>
</Caption>