import { select } from 'soupselect';
import { Parser, DefaultHandler } from 'htmlparser';
import { decode } from 'html-entities';
import type { BookmarkBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { ExtendedBlockObjectResponse, Processor } from '$lib/helpers';

function findTitle(dom: any): string | null {
	const results = select(dom, 'title');
	if (!!results && results.length > 0) {
		const result = results[0];
		return decode(result.children[0].raw);
	}

	return null;
}

function findFirstImage(dom: any): string | null {
	const results = select(dom, 'body img');
	if (!!results && results.length > 0) {
		const result = results[0];
		return result.attribs.src;
	}

	return null;
}

function findMetaContent(dom: any, type: 'image' | 'description' | 'title'): string | undefined {
	return ['og', 'twitter']
		.map((tag) => {
			const results = select(dom, `meta[property=${tag}:${type}]`);
			if (!!results && results.length > 0) {
				const result = results[0];
				const data = result.attribs?.content;
				return decode(data);
			}
		})
		.filter((data) => !!data)[0];
}

export const BookmarkProcessor: Processor<BookmarkBlockObjectResponse & ExtendedBlockObjectResponse> = {
    get blockType() { return "bookmark"; },
    process: async function (bookmark: BookmarkBlockObjectResponse & ExtendedBlockObjectResponse): Promise<void> {
        const response = await fetch(bookmark.bookmark.url);
        const bodyText = await response.text();

        const data = await new Promise((resolve, reject) => {
            const handler = new DefaultHandler(function (error, dom) {
                if (error) reject(error);
                else {
                    resolve({
                        title: findMetaContent(dom, 'title') ?? findTitle(dom),
                        description: findMetaContent(dom, 'description'),
                        image: findMetaContent(dom, 'image') ?? findFirstImage(dom)
                    });
                }
            });

            const parser = new Parser(handler);
            parser.parseComplete(bodyText);
        });

        bookmark.__meta = data;
    }
}