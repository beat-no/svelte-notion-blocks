<script lang="ts">
	import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

	import Heading1 from './Heading1.svelte';
	import Paragraph from './Paragraph.svelte';
	import Code from './Code.svelte';
	import Heading2 from './Heading2.svelte';
	import Heading3 from './Heading3.svelte';
	import Image from './Image.svelte';
	import Debug from './Debug.svelte';
	import BulletListItem from './BulletListItem.svelte';
	import NumberedListItem from './NumberedListItem.svelte';
	import Callout from './Callout.svelte';
	import Bookmark from './Bookmark.svelte';
	import Quote from './Quote.svelte';
	import Toggle from './Toggle.svelte';
	import Divider from './Divider.svelte';
	import Todo from './Todo.svelte';
	import Table from './Table.svelte';
	import ColumnList from './ColumnList.svelte';

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

		if (block.type === 'numbered_list_item') {
			const number = getItemNumberOfSameType(block);
			if (!!number) {
				props['number'] = number;
			}
		}

		return props;
	}

	function getItemNumberOfSameType(originalBlock: BlockObjectResponse) {
		let count = 0;
		for (let i = blocks.indexOf(originalBlock); i >= 0; i--) {
			let block = blocks[i];
			if (block.type === originalBlock.type) {
				count++;
			} else {
				return count;
			}
		}

		return count;
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
