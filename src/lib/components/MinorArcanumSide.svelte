<script lang="ts">
	import ArcanumContents from './ArcanumContents.svelte';

	export let scale = 1;

	export let sideLabel = '';
	export let content = '';
	export let title = '';
	export let load = 0;
	export let loadNote = '';
	export let tags: string[] = [];
	export let monogram = '';
</script>

<div class="eighth-page minor-arcanum-section minor-arcanum-bg" style="--scale: {scale}">
	<div class="minor-arcanum">
		<div class="card-label-container">
			<div class="special-header card-label">Minor Arcanum</div>
		</div>
		<div class="arcanum-body">
			<ArcanumContents {content} {title} {load} {loadNote} {tags} />
		</div>
		<div class="side-label">{sideLabel}</div>
		<div class="arcanum-number-circle">{monogram}</div>
	</div>
</div>

<style>
	.minor-arcanum-section {
		--scale: 1;
		margin: 0;

		/* This font (in rem) sets the scale for nodes under it, which are in em */
		font-size: calc(0.675rem * var(--scale));
	}
	.eighth-page {
		aspect-ratio: 2.75/4.25;
		width: calc(2.75in * var(--scale));

		/* padding: 0.2in; */
		padding: calc(0.425in * var(--scale)) calc(0.44in * var(--scale)) calc(0.4in * var(--scale));
	}

	.eighth-page.minor-arcanum-bg {
		background-image: url('/img/minor-arcana-frame-transparent.png');
		background-size: cover;
		background-position: center;
	}

	.minor-arcanum {
		position: relative;
		/* border-style: solid;
		border-image: url('/img/arcana-frame.png');
		border-image-slice: 128;
		border-width: calc(22px * var(--scale));
		border-image-repeat: round; */

		display: flex;
		flex-direction: column;

		height: 100%;
	}

	.card-label-container {
		position: absolute;
		display: flex;
		top: -2.2em;
		width: 100%;
	}

	.card-label {
		text-align: center;
		font-size: 1.45em;
		margin: auto;

		background-color: white;
		line-height: 1em;
	}

	.arcanum-body {
		flex-grow: 1;
	}

	.side-label {
		text-transform: lowercase;
		font-family: 'FellTypeSC Roman', serif;
		font-size: 1em;
		text-align: center;
	}

	.arcanum-number-circle {
		font-family: 'Avara';
		text-align: center;
		vertical-align: middle;

		display: flex;
		justify-content: center;
		align-items: center;

		position: absolute;
		bottom: -2.3em;
		width: 100%;

		font-size: 0.8em;
	}
</style>
