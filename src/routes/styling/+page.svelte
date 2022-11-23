<script lang="ts">
    import Blocks from '$lib/blocks/Blocks.svelte';
    import "../demo_carbon.css";

    export let data;

    const { page, blocks } = data;
</script>

<svelte:head>
    <title>Styling &mdash; Notion Blocks for Svelte</title>
</svelte:head>

<article class="demo carbon">
    <h1>Styling</h1>

    <Blocks {blocks} />
</article>