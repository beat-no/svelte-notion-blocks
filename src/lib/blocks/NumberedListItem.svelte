<script lang="ts">
	import type { NumberedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
    import RichText from "$lib/blocks/RichText.svelte";

    export let block: NumberedListItemBlockObjectResponse;
    export let number: number;
</script>

<!--
@component
Numbered list items have a quirk in Notion; the API does appear not expose the 
number of the list item at all.

So there will be a difference in rendering if you start numbering a list at any 
number besides 1.

The number prop is calculated by Blocks.svelte, and technically passed to every
block component.
-->

<ol>
    <li value="{number}"><RichText texts={block.numbered_list_item.rich_text} /></li>
</ol>