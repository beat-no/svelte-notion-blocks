<script lang="ts">
	import type { TableRowBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
	import TableCell from "$lib/blocks/TableCell.svelte";

    export let row: TableRowBlockObjectResponse;
    export let has_row_header: boolean = false;
    export let header: boolean = false;
</script>

<tr>
    {#each row.table_row.cells as cell, i}
    <TableCell {cell} header={header || (i == 0 && has_row_header)} />
    {/each}
</tr>