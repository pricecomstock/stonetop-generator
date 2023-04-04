<script lang="ts">
	import {
		backMd,
		frontMd,
		title,
		tags as rawTags,
		load,
		loadNote,
		minorArcanum,
		monogram
	} from '$lib/stores/minorArcanum';
	import MinorArcanum from '$lib/components/MinorArcanum.svelte';
	import MarkdownEditor from '$lib/components/MarkdownEditor.svelte';
	import { toPng } from 'html-to-image';
	import { download } from '$lib/util/download';
	import { exportPngErrorMsg } from '$lib/util/constants';
	import { RenderMode } from '$lib/util/renderMode';
	import { tick } from 'svelte';

	let errorMsg = '';

	let renderMode: RenderMode = RenderMode.PREVIEW;
	let outputNode: HTMLElement;

	const exportPng = async () => {
		renderMode = RenderMode.PNG;

		await tick();

		errorMsg = '';
		try {
			const dataUrl = await toPng(outputNode, {
				canvasHeight: outputNode.clientHeight * 1.5,
				canvasWidth: outputNode.clientWidth * 1.5,
				backgroundColor: 'white',
				pixelRatio: 1
			});

			download(dataUrl, `${$title.toLowerCase().replaceAll(/\s+/gi, '-')}-minor-arcanum.png`);
		} catch (e) {
			errorMsg = exportPngErrorMsg;
			console.log(e);
		}

		renderMode = RenderMode.PREVIEW;
	};
</script>

<div class="editor-page">
	<div class="input-form">
		<div class="button-group">
			<button class="export" on:click={exportPng}>➤ Export PNG</button>
			<a href="/minor/print">
				<button class="export"
					>➤ Print/PDF <div class="button-tags">experimental</div></button
				>
			</a>
		</div>
		{#if errorMsg.length}
			<div class="error">{errorMsg}</div>
		{/if}
		<div class="field">
			<label for="title">Title</label>
			<input name="title" id="title" bind:value={$title} />
		</div>
		<div class="field">
			<label for="tags">Load</label>
			<input min="0" type="number" name="tags" id="tags" bind:value={$load} />
		</div>
		<div class="field">
			<label for="loadNote">Load Note</label>
			<input min="0" type="text" name="loadNote" id="loadNote" bind:value={$loadNote} />
		</div>
		<div class="field">
			<label for="tags">Tags</label>
			<input name="tags" id="tags" bind:value={$rawTags} />
		</div>
		<div class="field">
			<label for="front">Front</label>

			<MarkdownEditor bind:value={$frontMd} />
		</div>
		<div class="field">
			<label for="back">Back</label>

			<MarkdownEditor bind:value={$backMd} />
		</div>
		<div class="field">
			<label for="monogram">Number/Monogram</label>
			<input name="monogram" id="monogram" bind:value={$monogram} />
		</div>
	</div>

	<div class="editor-output">
		<MinorArcanum {renderMode} minorArcanum={$minorArcanum} bind:imgOutputNode={outputNode} />
	</div>
</div>

<style>
</style>
