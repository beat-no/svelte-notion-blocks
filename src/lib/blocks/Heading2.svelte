<script lang="ts">
	import type { Heading2BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
    import RichText from "$lib/blocks/RichText.svelte";

    export let block: Heading2BlockObjectResponse;
</script>

<h2><RichText texts={block.heading_2.rich_text} /></h2>