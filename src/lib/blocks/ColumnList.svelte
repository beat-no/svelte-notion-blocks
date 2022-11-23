<script lang="ts">
	import type { ColumnListBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
	import Column from './Column.svelte';

	export let block: ColumnListBlockObjectResponse;
</script>

<section class="column_list">
	{#each block.children as child}
		<aside class="column">
			<Column block={child} />
		</aside>
	{/each}
</section>