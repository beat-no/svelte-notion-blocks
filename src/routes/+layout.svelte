<script lang="ts">
	import {
		Header,
		HeaderNav,
		HeaderNavItem,
		HeaderUtilities,
		SideNav,
		SideNavItems,
		SideNavMenu,
		SideNavLink,
		SkipToContent,
		Content,
		Grid,
		Row,
		Column,
		HeaderActionLink
	} from 'carbon-components-svelte';
	import { getBlockIcon } from './blockIcons';

	import LogoGithub from 'carbon-icons-svelte/lib/LogoGithub.svelte';
	import Home from 'carbon-icons-svelte/lib/Home.svelte';
	import FaceSatisfied from 'carbon-icons-svelte/lib/FaceSatisfied.svelte';
	import HorizontalView from 'carbon-icons-svelte/lib/HorizontalView.svelte';

	import 'carbon-components-svelte/css/all.css';
	import ThemeSwitcher from './ThemeSwitcher.svelte';

	export let data;
	const { blockTypes } = data;

	let isSideNavOpen = false;
</script>

<Header company="Notion blocks" platformName="for Svelte" href="/" bind:isSideNavOpen>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>

	<HeaderNav>
		<HeaderNavItem href="/" text="Introduction" />
		<HeaderNavItem href="/styling" text="Styling" />
		<HeaderNavItem href="/blocks" text="Blocks" />
	</HeaderNav>

	<HeaderUtilities>
		<ThemeSwitcher />
		<HeaderActionLink
			aria-label="Github project"
			icon={LogoGithub}
			href="https://github.com/beat-no/svelte-notion-blocks"
		/>
		<HeaderActionLink aria-label="Beat Technology AS website" href="https://beat.no">
			<img src="/beat_logo.svg" slot="icon" width="24" height="24" alt="Beat Technology AS" />
		</HeaderActionLink>
	</HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
	<SideNavItems>
		<SideNavLink icon={Home} href="/" text="Introduction" />
		<SideNavLink icon={FaceSatisfied} href="/styling" text="Styling" />
		<SideNavMenu icon={HorizontalView} href="/blocks" text="Blocks">
			{#each blockTypes as { id, name }}
				<SideNavLink icon={getBlockIcon(id)} href="/blocks/{id}" text={name} />
			{/each}
		</SideNavMenu>
	</SideNavItems>
</SideNav>

<Content>
	<Grid>
		<Row>
			<Column>
				<slot />
			</Column>
		</Row>
	</Grid>
</Content>
