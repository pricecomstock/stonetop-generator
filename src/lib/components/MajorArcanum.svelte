<script lang="ts">
	import type { MajorArcanum } from '$lib/types';
	import { RenderMode } from '$lib/util/renderMode';
	import MajorArcanumSide from './MajorArcanumSide.svelte';
	import PrintInstructions from './PrintInstructions.svelte';

	export let majorArcanum: MajorArcanum;
	export let imgOutputNode: HTMLElement;

	export let renderMode: RenderMode = RenderMode.PREVIEW;

	$: scale = renderMode === RenderMode.PDF_PRINT ? 1 : renderMode === RenderMode.PNG ? 2 : 1.5;
</script>

<div
	bind:this={imgOutputNode}
	class="container"
	class:export-png-layout={renderMode === RenderMode.PNG}
	class:print-layout={renderMode === RenderMode.PDF_PRINT}
	class:preview-layout={renderMode === RenderMode.PREVIEW}
>
	<div class="front">
		<MajorArcanumSide
			{scale}
			sideLabel="front"
			imgUrl={majorArcanum.imgUrl}
			content={majorArcanum.frontMd}
			title={majorArcanum.title}
			load={majorArcanum.load}
			loadNote={majorArcanum.loadNote}
			tags={majorArcanum.tags}
			monogram={majorArcanum.monogram}
		/>
	</div>
	{#if renderMode === RenderMode.PDF_PRINT}
		<div class="print-instructions">
			<PrintInstructions />
		</div>
		<div class="page-break" />
	{/if}
	<div class="back">
		<MajorArcanumSide
			{scale}
			sideLabel="back"
			content={majorArcanum.backMd}
			tags={[]}
			monogram={majorArcanum.monogram}
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
		grid-template-columns: 2;
		grid-template-rows: 2;

		.front {
			grid-column: 1;
			grid-row: 1;
		}
		.back {
			grid-column: 2;
			grid-row: 2;
		}
	}

	.print-instructions {
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
			margin-top: -0.5in;
			margin-bottom: -0.5in;
		}
		& div:first-child {
			margin-right: -1in;
			margin-left: -0.5in;
		}

		& div:last-child {
			/* This should equal the left margin on the first one */
			margin-left: -0.5in;
			margin-right: -0.5in;
		}
	}

	.page-break {
		break-after: always;
	}

	/* .half-page-filler {
		aspect-ratio: 5.5/8.5;
		width: 5.5in;

		border-radius: 1rem;
		border: 3px dashed black;
	} */
</style>
