<script lang="ts">
    import Blocks from '$lib/blocks/Blocks.svelte';
    import { RadioButton, RadioButtonGroup, Tile } from 'carbon-components-svelte';

    import '../../demo_carbon.css';
    import '../../demo_notion.css';

    export let data;
    $: ({ page, blocks } = data);

    let style: string = "carbon";

    const styles = [
        { name: "Carbon", className: "carbon", comment: "Made to fit into Carbon Components" },
        { name: "Notion-like", className: "notion", comment: "Fit closely with Notion" },
        { name: "None", className: "none", comment: "No styles applied to the content itself" },
    ];
</script>

<h1>{page.properties.Name.title[0].plain_text}</h1>

<Tile>
    <p>This page is generated from a page in Notion database, and is intended to demonstrate the capability of the {page.properties.Name.title[0].plain_text} block.</p>

    <p>You can <a href={page.url}>view this page in Notion</a> to see that it corresponds well to what is displayed.</p>

    <p>You can pick a stylesheet below to change how it renders.</p>

    <RadioButtonGroup legendText="Stylesheet" bind:selected={style} >
        {#each styles as { name, className }}
            <RadioButton labelText={name} value={className} />
        {/each}
    </RadioButtonGroup>
</Tile>

<article class="demo {style}">
    <Blocks blocks={blocks} />
</article>


<style>
    h1 {
        margin-bottom: var(--cds-spacing-05);
    }

    article {
        margin-top: 1rem;
        border: 1px solid var(--cds-ui-01);
        background: var(--cds-ui-02);
        padding: var(--cds-spacing-04);
    }
</style>