<script lang="ts">
	import type { ToggleBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
    import RichText from "$lib/blocks/RichText.svelte";
	import Children from "./Children.svelte";

    export let block: ToggleBlockObjectResponse;
</script>

<details>
    <summary><RichText texts={block.toggle.rich_text} /></summary>

    <Children {block} />
</details>

<style>

</style>