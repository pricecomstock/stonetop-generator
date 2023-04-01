<script lang="ts">
	import MarkdownEditor from '$lib/components/MarkdownEditor.svelte';
	import { freeMd } from '$lib/stores/free';
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
	</div>

	<div class="editor-output">
		<FreeOutput renderMode={RenderMode.PREVIEW} content={$freeMd} />
	</div>
</div>

<style>
</style>
