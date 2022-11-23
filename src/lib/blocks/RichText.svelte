<script lang="ts">
	import type { RichTextItemResponse, TextRichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
	import RichTextFormat from "./RichTextFormat.svelte";

    export let texts: RichTextItemResponse[];

    export declare type Annotation = {
        type: "bold"|"italic"|"strikethrough"|"underline"|"code"|"color"|"link";
        value: any;
    }

    function getAppliedFormats(text: TextRichTextItemResponse): Array<Annotation>  {
        const annotations = Object
            .keys(text.annotations)
            .filter(k => !!text.annotations[k] && text.annotations[k] !== 'default')
            .map(k => ({ type: <"bold"|"italic"|"strikethrough"|"underline"|"code"|"color">k, value: text.annotations[k] }));

        if (!!text.text.link) {
            return [...annotations, { type: "link", href: text.text.link.url }];
        }
        
        return annotations;
    }
</script>

{#each texts.filter(t => t.type === "text") as text}
    <RichTextFormat annotations={getAppliedFormats(text)}>{text.text.content}</RichTextFormat>
{/each}