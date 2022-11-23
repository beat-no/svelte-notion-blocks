<script lang="ts">
	import {
		Tag,
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch
	} from 'carbon-components-svelte';
	import ArrowRight from "carbon-icons-svelte/lib/ArrowRight.svelte";

	import { getBlockIcon } from '../blockIcons';
	import { goto } from '$app/navigation';

	export let data;

	const { blockTypes } = data;

	const headers = [
		{ key: 'icon', value: 'Icon', width: '48px' },
		{ key: 'name', value: 'Name' },
		{ key: 'support', value: 'Support', sort: (a, b) => a.name > b.name ? -1 : 1 },
		{ key: 'actions', value: '', width: '48px' }
	];
</script>

<DataTable {headers} rows={blockTypes} sortable zebra
    title="Notion blocks"
    description="Gives you an overview of all the Notion blocks and how well they are supported."
    on:click:row={(e) => goto(`/blocks/${e.detail.id}`)}>
    <Toolbar>
        <ToolbarContent>
          <ToolbarSearch
            persistent
            shouldFilterRows
          />
        </ToolbarContent>
      </Toolbar>
	<svelte:fragment slot="cell" let:row let:cell>
		{#if cell.key === 'support'}
			{#if !!row.support}
				<Tag type={row.support.color}>{row.support.name}</Tag>
			{/if}
		{:else if cell.key == 'icon'}
			<svelte:component this={getBlockIcon(row.id)} size={24} />
		{:else if cell.key == 'actions'}
	  		<ArrowRight size={24} />
		{:else}
			{cell.value}
		{/if}
	</svelte:fragment>
</DataTable>