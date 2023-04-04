<script lang="ts">
	import MarkdownEditor from '$lib/components/MarkdownEditor.svelte';
	import { freeMd, freeColumns, freeFontSizePx, isLandscape } from '$lib/stores/free';
	import FreeOutput from '$lib/components/FreeOutput.svelte';
	import { RenderMode } from '$lib/util/renderMode';
</script>

<div class="editor-page">
	<div class="input-form">
		<div class="button-group">
			<a href="/free/print">
				<button class="export"
					>➤ Print/PDF <div class="button-tags">experimental</div></button
				>
			</a>
		</div>
		<div class="field">
			<label for="freeMd">Free Writing</label>
			<MarkdownEditor bind:value={$freeMd} />
		</div>
		<div class="field">
			<label for="landscape">Landscape: {$isLandscape}</label>
			<input type="checkbox" name="landscape" id="landscape" bind:checked={$isLandscape} />
		</div>
		<div class="field">
			<label for="columns">Columns: {$freeColumns}</label>
			<input type="range" name="columns" id="columns" min="1" max="4" bind:value={$freeColumns} />
		</div>
		<div class="field">
			<label for="fontsize">Base Font Size: {$freeFontSizePx}px</label>
			<input
				type="range"
				name="fontsize"
				id="fontsize"
				min="12"
				max="32"
				bind:value={$freeFontSizePx}
			/>
		</div>
	</div>

	<div class="editor-output">
		<FreeOutput renderMode={RenderMode.PREVIEW} content={$freeMd} />
	</div>
</div>

<style>
</style>
