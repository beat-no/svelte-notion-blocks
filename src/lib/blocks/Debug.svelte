<script lang="ts">
	import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

    export let block: BlockObjectResponse;
    export let message: string = "Debug";
</script>

<details>
    <summary>{message}: <code>{block.type}</code></summary>
    <pre>{JSON.stringify(block, undefined, 2)}</pre>
</details>

<style>
    details {
        padding: 1rem;
        background: #ffd0d0;
        margin-bottom: 1rem;
    }
</style>