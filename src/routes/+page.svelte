<script lang="ts">
    import Blocks from '$lib/blocks/Blocks.svelte';
    import "./demo_carbon.css";

    export let data;

    const { page, blocks } = data;
</script>

<h1>Notion blocks for Svelte</h1>

<p class="lead">
    Wouldn't it be cool if you could use Notion as a CMS for your website? Then this is the project for you.
</p>

<p>
    Notion exposes <a href="https://developers.notion.com/reference/intro">a wonderful API</a> with many 
    different blocks available. So we had a thought; could we use Notion as a real CMS? We were pretty 
    happy with Notion's text formatting tools and fast editor. So this project was born.
</p>

<article class="demo carbon">
    <Blocks {blocks} />
</article>