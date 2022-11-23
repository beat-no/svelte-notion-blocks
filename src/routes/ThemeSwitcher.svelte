<script>
	import { browser } from '$app/environment';

	import { HeaderGlobalAction, LocalStorage } from 'carbon-components-svelte';

	import Light from 'carbon-icons-svelte/lib/Light.svelte';
	import Moon from 'carbon-icons-svelte/lib/Moon.svelte';

	let toggled = false;

	$: if (browser) {
		document.documentElement.setAttribute('theme', toggled ? 'g100' : 'white');
	}
</script>

<LocalStorage key="dark-mode" bind:value={toggled} />

<HeaderGlobalAction icon={toggled ? Moon : Light} on:click={() => (toggled = !toggled)} />
