<script lang="ts">
	import { marked } from '$lib/stonetop-markdown/marked-extension';
	import { RenderMode } from '$lib/util/renderMode';

	export let content: string;

	$: parsedContent = marked(content);

	export let renderMode: RenderMode = RenderMode.PREVIEW;
</script>

<div
	class="full-page free-output"
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

<style>
	.free-output {
		--scale: 1;
	}
	.full-page.preview-layout {
		aspect-ratio: 8.5/11;
		width: calc(8.5in * var(--scale));
		border: 1px dotted black;
		/* This font (in rem) sets the scale for nodes under it, which are in em */
		font-size: calc(1rem * var(--scale));

		padding: 0.5in 0.75in;
	}

	.full-page.print-layout {
		border: none;
		padding: 0;
		margin: 0.75in 1in;
	}
</style>
