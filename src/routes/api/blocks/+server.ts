import { listPages, aggressiveCache } from '$lib/server';
import { Client } from '@notionhq/client/build/src';
import { json } from '@sveltejs/kit';
import { BlockDatabase } from '../../databases.server';
import { env } from '$env/dynamic/private';

const client = new Client({ auth: env.VITE_NOTION_API_KEY });

export async function GET() {
    const response = await listPages(client, BlockDatabase, undefined, 100);
    const blocks = response.results.map(p => ({
        id: p.properties.Type.rich_text.map(r => r.plain_text).join(' '),
        name: p.properties.Name.title.map(r => r.plain_text).join(' '),
        support: p.properties.Support.select
    }));
    return json(blocks, aggressiveCache(3600));
}