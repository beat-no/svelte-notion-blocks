<script lang="ts">
	import type { CalloutBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
    import RichText from "$lib/blocks/RichText.svelte";
	import Children from "./Children.svelte";

    export let block: CalloutBlockObjectResponse;
</script>

<aside class="callout {block.callout.color}">
    <RichText texts={block.callout.rich_text} />

    <Children {block} />
</aside>