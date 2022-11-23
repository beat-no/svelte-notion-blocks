<script lang="ts">
	import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

	import Heading1 from '$lib/blocks/Heading1.svelte';
	import Paragraph from '$lib/blocks/Paragraph.svelte';
	import Code from '$lib/blocks/Code.svelte';
	import Heading2 from '$lib/blocks/Heading2.svelte';
	import Heading3 from '$lib/blocks/Heading3.svelte';
	import Image from '$lib/blocks/Image.svelte';
	import Debug from '$lib/blocks/Debug.svelte';
	import BulletListItem from '$lib/blocks/BulletListItem.svelte';
	import NumberedListItem from '$lib/blocks/NumberedListItem.svelte';
	import Callout from '$lib/blocks/Callout.svelte';
	import Bookmark from '$lib/blocks/Bookmark.svelte';
	import Quote from '$lib/blocks/Quote.svelte';
	import Toggle from '$lib/blocks/Toggle.svelte';
	import Divider from '$lib/blocks/Divider.svelte';
	import Todo from '$lib/blocks/Todo.svelte';
	import Table from '$lib/blocks/Table.svelte';
	import ColumnList from '$lib/blocks/ColumnList.svelte';

	const map: { [index: string]: ConstructorOfATypedSvelteComponent } = {
		heading_1: Heading1,
		heading_2: Heading2,
		heading_3: Heading3,
		paragraph: Paragraph,
		code: Code,
		image: Image,
		bulleted_list_item: BulletListItem,
		numbered_list_item: NumberedListItem,
		callout: Callout,
		bookmark: Bookmark,
		quote: Quote,
		toggle: Toggle,
		divider: Divider,
		to_do: Todo,
		table: Table,
		column_list: ColumnList
	};

	function getComponent(block: BlockObjectResponse): ConstructorOfATypedSvelteComponent | null {
		return map.hasOwnProperty(block.type) ? map[block.type] : null;
	}

	export let blocks: BlockObjectResponse[];
	export let debug: boolean = true;

	function getPropsForBlock(block: BlockObjectResponse) {
		const props: { [prop: string]: any } = {};

		if (block.type === "numbered_list_item") {
			const number = getItemNumberOfSameType(block);
			if (!!number) {
				props['number'] = number;
			}
		}

		return props;
	}

	function getItemNumberOfSameType(block: BlockObjectResponse) {
		let count = 0;
		const type = block.type;
		for (let i = blocks.indexOf(block); i >= 0; i--) {
			block = blocks[i];
			if (block.type === type) {
				count++;
			} else {
				return count;
			}
		}
	}
</script>

{#each blocks as block}
	{@const component = getComponent(block)}
	{#if !!component}
		<svelte:component this={component} {block} {...getPropsForBlock(block)} />
	{:else if debug}
		<Debug message="Unsupported block type" {block} />
	{/if}
{/each}
