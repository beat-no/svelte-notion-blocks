import type { Database } from '$lib/server';

export const BlockDatabase: Database = {
	slug_property: 'Type',
	query: {
		database_id: 'd5aa56cee3114c83a608bd30f7163280',
		sorts: [
			{
				property: 'Name',
				direction: 'ascending'
			}
		],
		filter: {
			and: [
				{
					property: 'Type',
					rich_text: {
						does_not_contain: ' '
					}
				},
				{
					property: 'Type',
					rich_text: {
						is_not_empty: true
					}
				}
			]
		}
	}
};
