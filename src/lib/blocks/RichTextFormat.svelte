<script lang="ts">
	import type { Annotation } from '$lib/blocks/RichText.svelte';

	export let annotations: Annotation[];

	const elementMap = {
		bold: 'b',
		italic: 'i',
		underline: 'u',
		strikethrough: 's',
        link: 'a',
		color: 'span'
	};

	function elementFromType(type: string): string {
		if (!elementMap.hasOwnProperty(type)) {
			return type;
		}
		return elementMap[type];
	}

</script>

{#if annotations.length > 0}
	{@const [{ type, value, ...props  }, ...rest] = annotations}
	<svelte:element this={elementFromType(type)} class={value !== true ? value : ''} {...props}
		><svelte:self annotations={rest}><slot /></svelte:self></svelte:element
	>
{:else}
	<slot />
{/if}
