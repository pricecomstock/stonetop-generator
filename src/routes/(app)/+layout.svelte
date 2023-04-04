<script lang="ts">
	import '../../styles.postcss';
	import '../../md-render.postcss';
	import Instructions from '$lib/components/Instructions.svelte';

	import { page } from '$app/stores';

	const navItems = [
		{
			path: '/',
			name: 'Home',
			description: ''
		},
		{
			path: '/minor',
			name: 'Minor Arcanum',
			description: 'Generate a minor arcanum card'
		},
		{
			path: '/major',
			name: 'Major Arcanum',
			description: 'Generate a major arcanum card'
		},
		{
			path: '/free',
			name: 'Free Write',
			description: 'Write whatever you want in the Stonetop style'
		}
	];

	$: currentNav = navItems.find(
		(navItem) => $page.route.id === `/(app)${navItem.path}`.replace(/\/$/, '')
	);
</script>

<div class="mobile-warning">
	Hello, if you're viewing this website on a mobile device, it's going to be janky and you may have
	to scroll around strangely to see everything. But, it will technically work!
</div>
<nav>
	{#each navItems as navItem}
		{@const isSelected = $page.route.id === `/(app)${navItem.path.replace(/\/$/, '')}`}
		<div class:selected={isSelected}>
			{#if isSelected}
				<img src="/img/spiral-bullet.png" alt="" />
			{/if}
			<a href={navItem.path}>{navItem.name}</a>
			{#if isSelected}
				<img src="/img/spiral-bullet.png" alt="" />
			{/if}
		</div>
	{/each}
</nav>
<div class="page-container">
	<div class="description">{currentNav?.description}</div>
	<!-- <hr /> -->
	<slot />
</div>

<hr />

<div class="instructions">
	<Instructions />
</div>

<style>
	.page-container {
		margin: auto;
		padding: 1rem;
	}
	nav {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		align-items: center;
		background-color: white;

		font-family: 'Avara';
		font-size: 1.5rem;
	}

	nav > div {
		place-self: stretch;
		border-top: 2px solid black;
		border-left: 2px solid black;
		border-bottom: 2px solid black;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.5rem;
	}

	nav > div > a {
		color: #888;
	}

	nav > div > img {
		width: 1.5rem;
		height: 1.5rem;
		margin: 0 0.5rem;
	}

	nav > div.selected {
		border-bottom-color: rgba(0, 0, 0, 0);
	}

	nav > div.selected > a {
		color: black;
		text-decoration: underline 2px black;
	}

	nav a {
		text-decoration: none;
		text-align: center;
		max-width: 100%;
		color: black;

		/* text-transform: uppercase; */
		font-weight: bold;
	}

	nav a:hover {
		text-decoration: underline;
	}

	.description {
		font-size: 1.25em;
		text-align: center;
		margin: 1rem auto;

		max-width: 30rem;
	}

	.instructions {
		max-width: min(100%, 55rem);
		overflow-x: scroll;
		margin: auto;
	}

	.mobile-warning {
		width: 100vw;
		min-height: 3rem;
		display: flex;
		justify-content: center;
		align-items: center;

		text-align: center;
		padding: 1rem;

		background-color: #fb9;
	}

	@media screen and (min-width: 700px) {
		.mobile-warning {
			display: none !important;
		}
	}
</style>
