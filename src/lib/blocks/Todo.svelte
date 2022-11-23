<script lang="ts">
	import type { ToDoBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
	import Children from "./Children.svelte";
	import RichText from "./RichText.svelte";

    export let block: ToDoBlockObjectResponse;

    // override text annotation to strike through
    $: texts = block.to_do.rich_text.map(r => ({...r, annotations: { ...r.annotations, strikethrough: block.to_do.checked }}));
</script>

<div class="todo {block.to_do.color}">
    <input type="checkbox" readonly checked={block.to_do.checked} />
    <p><RichText {texts} /></p>

    <Children {block} />
</div>

<style>
    p {
        all: unset;
    }

    .todo {
        padding-left: 2rem;
    }

    input[type=checkbox] {
        margin-left: -2rem;
    }
</style>