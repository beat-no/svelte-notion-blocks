<script lang="ts">
	import type { TableBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
	import TableRow from "$lib/blocks/TableRow.svelte";

    export let block: TableBlockObjectResponse;

    $: rows = block.table.has_column_header ? block.children.slice(1) : block.children;
</script>

<table>
    {#if block.table.has_column_header}
    <thead>
        <TableRow header row={block.children[0]} />
    </thead>
    {/if}

    <tbody>
        {#each rows as row}
        <TableRow {row} has_row_header={block.table.has_row_header} />
        {/each}
    </tbody>
</table>

<style>
    table, table :global(td), table :global(th) {
        border: 1px solid gray;
        border-collapse: collapse;
    }
</style>