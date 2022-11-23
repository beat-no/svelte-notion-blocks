<script lang="ts">
	import type { ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
    import RichText from "$lib/blocks/RichText.svelte";

    export let block: ParagraphBlockObjectResponse;
</script>

<p class={block.paragraph.color}><RichText texts={block.paragraph.rich_text} /></p>