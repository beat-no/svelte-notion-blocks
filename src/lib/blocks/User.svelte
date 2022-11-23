<script lang="ts">
	import type { UserObjectResponse } from "@notionhq/client/build/src/api-endpoints";
    import Debug from "$lib/blocks/Debug.svelte";

    export let block: UserObjectResponse;
</script>

<figure>
<img src={block.avatar_url} alt={block.name} />
<p class="name">{block.name}</p>
<p class="email"><a href="mailto:{block.person.email}">{block.person.email}</a></p>
</figure>

<style>
    figure {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto auto;
        grid-column-gap: 0.5rem;

        align-items: center;

        margin: 0;
        margin-right: 2rem;
    }

    img {
        grid-area: 1 / 1 / 3 / 2;
        width: 3rem;
        height: 3rem;
        border-radius: 100%;
        border: 1px solid white;
    }

    p {
        margin: 0;
    }

    .name {
        font-weight: bold;
    }

    .email {
        font-size: 0.75rem;
    }
</style>