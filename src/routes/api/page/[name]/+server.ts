import { page, agressiveCache } from '$lib/server';
import { Client } from '@notionhq/client/build/src';
import { error, json } from '@sveltejs/kit';

const client = new Client({ auth: import.meta.env.VITE_NOTION_API_KEY });

const map = {
	introduction: '70d376d4fd334ef3a3095e59e0c97081',
	styling: 'e5a61b1f2f7c4fc4829aef7886911b2a'
};

export async function GET({ params }) {
	const { name } = params;
	if (typeof name === 'undefined' || !Object.hasOwn(map, name)) {
		return error(404);
	}

	const page_id = map[name];
	const response = await page(client, page_id);
	return json(response, agressiveCache(60 * 5));
}
