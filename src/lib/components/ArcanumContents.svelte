<script lang="ts">
	import { marked } from '$lib/stonetop-markdown/marked-extension';

	import Load from './Load.svelte';

	export let imgUrl = '';
	export let title = 'Big Boy 2';
	export let load = 1;
	export let loadNote = 'if stowed;';
	export let tags: string[] = [];

	export let content = '';

	$: hasLoadPunctuation = load > 0 && tags.length > 0;
	$: loadPunctuation = loadNote.length > 0 ? ';' : ',';
	$: parsedContent = marked(content);
</script>

{#if imgUrl}
	<div class="img-container"><img src={imgUrl} alt="" /></div>
{/if}
<div class="md-render">
	{#if title}
		<h1 class="card-title">{title}</h1>
	{/if}
	{#if tags.length > 0 || load > 0}
		<div class="tags">
			<Load count={load} note={`${loadNote}${hasLoadPunctuation ? loadPunctuation : ''}`} />
			{tags.join(', ')}
		</div>
	{/if}
</div>
<div class="md-render">
	{#if content}
		{@html parsedContent}
	{/if}
</div>

<style>
	.tags {
		text-align: center;
		margin-bottom: 0.5em;
	}

	.img-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 36.25%;
		margin: 1em auto;
	}

	img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}
</style>
