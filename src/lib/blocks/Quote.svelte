<script lang="ts">
	import type { QuoteBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
    import RichText from "$lib/blocks/RichText.svelte";
	import Children from "./Children.svelte";
	import Debug from "./Debug.svelte";

    export let block: QuoteBlockObjectResponse;
</script>

<blockquote class={block.quote.color}>
    <RichText texts={block.quote.rich_text} />

    <Children {block} />
</blockquote>