<script lang="ts">
	import type { Heading3BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
    import RichText from "$lib/blocks/RichText.svelte";

    export let block: Heading3BlockObjectResponse;
</script>

<h3><RichText texts={block.heading_3.rich_text} /></h3>