import * as htmlparser2 from 'htmlparser2';
import { decode } from 'html-entities';
import type { BookmarkBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { ExtendedBlockObjectResponse, Processor } from '$lib/server/helpers';

function findTitle(dom: htmlparser2.Element): string | null {
	const titleElements = htmlparser2.DomUtils.getElementsByTagName('title', dom, true);
	if (titleElements.length > 0) {
		const titleText = htmlparser2.DomUtils.getText(titleElements[0]);
		return decode(titleText);
	}

	return null;
}

function findFirstImage(dom: htmlparser2.Element): string | null {
	const bodyElements = htmlparser2.DomUtils.getElementsByTagName('body', dom, true);
	if (bodyElements.length > 0) {
		const imgElements = htmlparser2.DomUtils.getElementsByTagName('img', bodyElements[0], true);
		if (imgElements.length > 0) {
			return (imgElements[0] as htmlparser2.Element).attribs?.src || null;
		}
	}
	return null;
}

function findMetaContent(
	dom: htmlparser2.Element,
	type: 'image' | 'description' | 'title'
): string | undefined {
	return ['og', 'twitter']
		.map((tag) => {
			const metaElements = htmlparser2.DomUtils.getElementsByTagName('meta', dom, true);
			const matchingMeta = metaElements.find((meta) => {
				const element = meta as htmlparser2.Element;
				return element.attribs?.property === `${tag}:${type}`;
			});
			if (matchingMeta) {
				const element = matchingMeta as htmlparser2.Element;
				const data = element.attribs?.content;
				return data ? decode(data) : undefined;
			}
		})
		.filter((data) => !!data)[0];
}

export const BookmarkProcessor: Processor<
	BookmarkBlockObjectResponse & ExtendedBlockObjectResponse
> = {
	get blockType() {
		return 'bookmark';
	},
	process: async function (
		bookmark: BookmarkBlockObjectResponse & ExtendedBlockObjectResponse
	): Promise<void> {
		const response = await fetch(bookmark.bookmark.url);
		const bodyText = await response.text();

		const dom = htmlparser2.parseDocument(bodyText);
		const data = {
			title: findMetaContent(dom, 'title') ?? findTitle(dom),
			description: findMetaContent(dom, 'description'),
			image: findMetaContent(dom, 'image') ?? findFirstImage(dom)
		};

		bookmark.__meta = data;
	}
};
