<script lang="ts">
	import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
    import Blocks from '$lib/blocks/Blocks.svelte';

    export let block: BlockObjectResponse;
</script>

<!--
@component
This component exists for other components to easily display child blocks.

Usage:
```svelte
  <Children {block} />
```
-->
{#if block.has_children && block.children?.length > 0}
<Blocks blocks={block.children} />
{/if}