<script lang="ts">
	import type { Heading1BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
    import RichText from "$lib/blocks/RichText.svelte";

    export let block: Heading1BlockObjectResponse;
</script>

<h1><RichText texts={block.heading_1.rich_text} /></h1>