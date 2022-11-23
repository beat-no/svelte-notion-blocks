import Paragraph from 'carbon-icons-svelte/lib/Paragraph.svelte';
import Image from 'carbon-icons-svelte/lib/Image.svelte';
import Unknown from 'carbon-icons-svelte/lib/Unknown.svelte';
import Code from 'carbon-icons-svelte/lib/Code.svelte';
import ListBulleted from 'carbon-icons-svelte/lib/ListBulleted.svelte';
import ListNumbered from 'carbon-icons-svelte/lib/ListNumbered.svelte';
import ClosedCaption from 'carbon-icons-svelte/lib/ClosedCaption.svelte';
import ColumnIcon from 'carbon-icons-svelte/lib/Column.svelte';
import Bookmark from 'carbon-icons-svelte/lib/Bookmark.svelte';
import Table from 'carbon-icons-svelte/lib/Table.svelte';
import WarningAlt from 'carbon-icons-svelte/lib/WarningAlt.svelte';
import Quotes from "carbon-icons-svelte/lib/Quotes.svelte";
import CollapseCategories from "carbon-icons-svelte/lib/CollapseCategories.svelte";
import CheckboxChecked from "carbon-icons-svelte/lib/CheckboxChecked.svelte";
import TextFont from "carbon-icons-svelte/lib/TextFont.svelte";
import TextVerticalAlignment from "carbon-icons-svelte/lib/TextVerticalAlignment.svelte";

import type { SvelteComponent } from 'svelte';

const icons: { [id: string]: SvelteComponent } = {
    paragraph: Paragraph,
    image: Image,
    code: Code,
    bulleted_list_item: ListBulleted,
    numbered_list_item: ListNumbered,
    caption: ClosedCaption,
    column: ColumnIcon,
    bookmark: Bookmark,
    table: Table,
    callout: WarningAlt,
    quote: Quotes,
    toggle: CollapseCategories,
    todo: CheckboxChecked,
    headings: TextFont,
    divider: TextVerticalAlignment
};

export function getBlockIcon(id: string): SvelteComponent {
    if (Object.hasOwn(icons, id)) {
        return icons[id];
    }

    return Unknown;
}