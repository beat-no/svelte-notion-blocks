import type { Client } from '@notionhq/client';
import type {
	BlockObjectResponse,
	ListBlockChildrenResponse,
	PageObjectResponse,
	QueryDatabaseParameters,
	QueryDatabaseResponse
} from '@notionhq/client/build/src/api-endpoints';
import structuredClone from '@ungap/structured-clone';

import { BookmarkProcessor } from '$lib/processors/bookmark';

export interface Database {
	query: QueryDatabaseParameters;
	slug_property: string;
}

export type ExtendedBlockObjectResponse = BlockObjectResponse & {
	children?: ExtendedBlockObjectResponse[];
	__meta?: any;
};

export interface CompletePage {
	page: PageObjectResponse;
	blocks: ExtendedBlockObjectResponse[];
}

export interface Processor<T extends ExtendedBlockObjectResponse> {
	get blockType(): string;
	process(block: T): Promise<void>;
}

const processors = [BookmarkProcessor];

export async function retrieveBlocks(client: Client, block_id: string, nested = true) {
	let all_blocks: ExtendedBlockObjectResponse[] = [];
	let blocks: ExtendedBlockObjectResponse[] = [];
	let start_cursor: string | undefined = undefined;
	let response: ListBlockChildrenResponse;
	do {
		response = await client.blocks.children.list({ block_id, page_size: 100, start_cursor });
		blocks = <ExtendedBlockObjectResponse[]>[...blocks, ...response.results];
		start_cursor = response.next_cursor;
	} while (response.has_more);

	all_blocks = [...blocks];

	if (nested) {
		const tasks = blocks
			.filter((b) => b.has_children)
			.map(async (block) => {
				const children = await retrieveBlocks(client, block.id, nested);
				block.children = children;
				all_blocks = [...all_blocks, ...children];
			});
		await Promise.all(tasks);
	}

	await Promise.all(
		all_blocks.flatMap((b) =>
			processors.filter((p) => p.blockType == b.type).map((p) => p.process(b))
		)
	);

	return blocks;
}

export async function pageFromSlug(
	client: Client,
	database: Database,
	slug: string,
	get_nested_children = true
): Promise<CompletePage> {
	const query = structuredClone(database.query);
	query.page_size = 1;
	query.filter?.and?.push({
		property: database.slug_property,
		rich_text: {
			equals: slug
		}
	});

	const response = await client.databases.query(query);
	const blocks = await retrieveBlocks(client, response.results[0].id, get_nested_children);

	return { page: <PageObjectResponse>response.results[0], blocks };
}

export async function page(
	client: Client,
	page_id: string,
	get_nested_children = true
): Promise<CompletePage> {
	const page = await client.pages.retrieve({ page_id });
	const blocks = await retrieveBlocks(client, page.id, get_nested_children);
	return { page, blocks };
}

export async function listPages(
	client: Client,
	database: Database,
	cursor: string | undefined = undefined,
	page_size = 5
): Promise<QueryDatabaseResponse> {
	const query = structuredClone(database.query);
	query.page_size = page_size;
	query.start_cursor = cursor ?? undefined;

	return await client.databases.query(query);
}

export function agressiveCache(timeout: number) {
	return {
		headers: {
			'cache-control': `public, max-age=${timeout}`
		},
		cf: {
			cacheTtl: timeout,
			cacheEverything: true
		}
	};
}
