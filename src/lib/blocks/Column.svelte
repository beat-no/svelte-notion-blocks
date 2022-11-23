<script lang="ts">
	import type { ColumnBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
	import Children from './Children.svelte';

	export let block: ColumnBlockObjectResponse;
</script>

<Children {block} />
