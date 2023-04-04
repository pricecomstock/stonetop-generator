<script lang="ts">
	import type { MinorArcanum } from '$lib/types';
	import { RenderMode } from '$lib/util/renderMode';
	import MinorArcanumSide from './MinorArcanumSide.svelte';
	import PrintInstructions from './PrintInstructions.svelte';

	export let minorArcanum: MinorArcanum;
	export let imgOutputNode: HTMLElement;

	export let renderMode: RenderMode = RenderMode.PREVIEW;

	$: scale = renderMode === RenderMode.PDF_PRINT ? 1 : 2;
</script>

<div
	bind:this={imgOutputNode}
	class="container"
	class:export-png-layout={renderMode === RenderMode.PNG}
	class:print-layout={renderMode === RenderMode.PDF_PRINT}
	class:preview-layout={renderMode === RenderMode.PREVIEW}
>
	<div class="front">
		<MinorArcanumSide
			{scale}
			sideLabel="front"
			content={minorArcanum.frontMd}
			title={minorArcanum.title}
			load={minorArcanum.load}
			loadNote={minorArcanum.loadNote}
			tags={minorArcanum.tags}
			monogram={minorArcanum.monogram}
		/>
	</div>
	{#if renderMode === RenderMode.PDF_PRINT}
		<div class="print-instructions">
			<PrintInstructions />
		</div>
		<div class="page-break" />
	{/if}
	<div class="back">
		<MinorArcanumSide
			{scale}
			sideLabel="back"
			content={minorArcanum.backMd}
			tags={[]}
			monogram={minorArcanum.monogram}
		/>
	</div>
</div>

<style lang="postcss">
	.container {
		display: inline-flex;
		flex-wrap: wrap;

		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
	}

	.container.export-png-layout {
		flex-wrap: nowrap;
	}

	.container.print-layout {
		display: inline-grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr 1fr;

		.front {
			grid-column: 1;
			grid-row: 1;
		}
		.back {
			grid-column: 4;
			grid-row: 3;
		}
	}

	.print-instructions {
		grid-column: 2 / 5;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media print {
		.print-instructions {
			display: none;
		}
	}

	.export-png-layout,
	.preview-layout {
		& div {
			margin-top: -0.25in;
			margin-bottom: -0.25in;
		}
		& div:first-child {
			margin-right: -0.5in;
			margin-left: -0.25in;
		}

		& div:last-child {
			margin-left: -0.25in;
			margin-right: -0.25in;
		}
	}

	.page-break {
		break-after: always;
	}
</style>
