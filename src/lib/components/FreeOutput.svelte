<script lang="ts">
	import { marked } from '$lib/stonetop-markdown/marked-extension';
	import { RenderMode } from '$lib/util/renderMode';
	import { freeFontSizePx, freeColumns, isLandscape } from '$lib/stores/free';

	export let content: string;

	$: parsedContent = marked(content);

	export let renderMode: RenderMode = RenderMode.PREVIEW;
</script>

{#if renderMode === RenderMode.PDF_PRINT}
	<div class="print-instructions">
		<div class="md-render">
			This print preview will look a little wacky on screen, but should print okay! I have tested in
			Chromium, but things might work differently in different browsers. Safari and Firefox have
			iffy support for CSS print layout features.
			<ul>
				<li>Use your browser print dialog. You may need to look under <b>More Settings</b></li>
				<li><b>Layout:</b> <i>portrait</i> or <i>landscape</i></li>
				<li><b>Margins:</b> <i>default</i> or <i>custom</i></li>
				<li><b>Background Graphics:</b> <i>on</i></li>
				<li><b>Two-sided:</b> <i>short-edge</i> for landscape, <i>long-edge</i> for portrait</li>
				<li><b>Headers and footers:</b> <i>off</i></li>
			</ul>
		</div>
	</div>
{/if}
<div
	style="--scale: 1; font-size: {$freeFontSizePx}px; columns: {$freeColumns};"
	class="full-page free-output"
	class:landscape={$isLandscape}
	class:portrait={!$isLandscape}
	class:export-png-layout={renderMode === RenderMode.PNG}
	class:print-layout={renderMode === RenderMode.PDF_PRINT}
	class:preview-layout={renderMode === RenderMode.PREVIEW}
>
	<div class="md-render">
		{#if content}
			{@html parsedContent}
		{/if}
	</div>
</div>

<style lang="postcss">
	.free-output {
		--scale: 1;
		column-fill: auto;
		column-gap: 1.5em;

		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
	}

	.full-page.preview-layout {
		border: 1px dotted black;
		/* This font (in rem) sets the scale for nodes under it, which are in em */

		padding: 0.75in 0.75in;

		&.landscape {
			aspect-ratio: 11/8.5;
			width: calc(11in * var(--scale));
		}

		&.portrait {
			aspect-ratio: 8.5/11;
			width: calc(8.5in * var(--scale));
		}
	}

	.full-page.print-layout {
		border: none;
		padding: 0;
		margin: auto;
	}

	.print-instructions {
		display: flex;
		justify-content: center;
		align-items: center;
		max-width: 70ch;
		margin: auto;

		border: 2px dashed red;
		padding: 1rem;
		font-size: 1.25rem;
	}

	@media print {
		.print-instructions {
			display: none;
		}
	}
</style>
