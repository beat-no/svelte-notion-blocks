<script lang="ts">
	import type { CodeBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
	import Caption from "$lib/blocks/Caption.svelte";

    export let block: CodeBlockObjectResponse;
</script>

<Caption caption={block.code.caption}>
    <pre class="code lang-{block.code.language}">{block.code.rich_text[0].plain_text}</pre>
</Caption>