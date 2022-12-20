<script lang="ts">
	import type { CodeBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
	import Caption from "$lib/blocks/Caption.svelte";

    export let block: CodeBlockObjectResponse;

    $: language = block?.code?.language
        .replace("c#", "csharp")
        .replace("c++", "cpp");
</script>

<Caption caption={block.code.caption}>
    <pre class="code lang-{language}">{block.code.rich_text[0].plain_text}</pre>
</Caption>