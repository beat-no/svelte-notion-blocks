<script lang="ts">
	import type { BulletedListItemBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
	import RichText from '$lib/blocks/RichText.svelte';
	import Blocks from '$lib/blocks/Blocks.svelte';

	export let block: BulletedListItemBlockObjectResponse;
</script>

<ul>
	<li>
		<RichText texts={block.bulleted_list_item.rich_text} />{#if block.has_children}<Blocks
				blocks={block.children}
			/>{/if}
	</li>
</ul>
