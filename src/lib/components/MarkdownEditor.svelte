<script lang="ts">
	import { EditorView } from 'codemirror';
	import {
		closeBrackets,
		autocompletion,
		closeBracketsKeymap,
		completionKeymap
	} from '@codemirror/autocomplete';
	import { keymap } from '@codemirror/view';
	import { markdown } from '@codemirror/lang-markdown';

	export let value: string;

	import CodeMirror from 'svelte-codemirror-editor';

	const customTheme = EditorView.theme({
		'&': {
			fontFamily: "'Fantasque Sans Mono', monospace",
			fontSize: '16px'
		},
		// For whatever reason this element assigns "monospace" font by default.
		'.cm-scroller': {
			lineHeight: '1.3',
			fontFamily: 'inherit'
		}
	});

	// https://codemirror.net/docs/ref/#state.EditorSelection
	const mdKeymap = keymap.of([
		{
			key: 'Mod-b',
			run: (cm) => {
				const from = cm.state.selection.main.from;
				const to = cm.state.selection.main.to;
				const s = cm.state.sliceDoc(from, to);
				const remove = s.slice(0, 2) === '**' && s.slice(-2) === '**';
				cm.dispatch(cm.state.replaceSelection(remove ? s.slice(2, -2) : `**${s}**`));
				return true;
			}
		},
		{
			key: 'Mod-i',
			preventDefault: true,
			run: (cm) => {
				const from = cm.state.selection.main.from;
				const to = cm.state.selection.main.to;
				const s = cm.state.sliceDoc(from, to);
				const remove = s.slice(0, 2) === '**' && s.slice(-2) === '**';
				cm.dispatch(cm.state.replaceSelection(remove ? s.slice(2, -2) : `**${s}**`));
				return true;
			}
		}
	]);
	// bold
	// 	{key:'Ctrl-B',run: function (cm) {
	// 		var s = cm.getSelection(),
	// 			t = s.slice(0, 2) === '**' && s.slice(-2) === '**';
	// 		cm.replaceSelection(t ? s.slice(2, -2) : '**' + s + '**', 'around');
	// 	}},
	// 	// italic
	// 	{key:'Ctrl-I',run: function (cm) {
	// 		var s = cm.getSelection(),
	// 			t = s.slice(0, 1) === '_' && s.slice(-1) === '_';
	// 		cm.replaceSelection(t ? s.slice(1, -1) : '_' + s + '_', 'around');
	// 	}},
	// 	// code
	// 	{key:'Ctrl-K',run: function (cm) {
	// 		var s = cm.getSelection(),
	// 			t = s.slice(0, 1) === '`' && s.slice(-1) === '`';
	// 		cm.replaceSelection(t ? s.slice(1, -1) : '`' + s + '`', 'around');
	// 	}},
	// 	// strike
	// 	{key:'Delete',run: function (cm) {
	// 		var s = cm.getSelection(),
	// 			t = s.slice(0, 2) === '~~' && s.slice(-2) === '~~';
	// 		if (!s) return null;
	// 		cm.replaceSele}ction(t ? s.slice(2, -2) : '~~' + s + '~~', 'around');
	// 	}
	// ]);
</script>

<div class="code-mirror-container">
	<CodeMirror
		theme={customTheme}
		extensions={[
			// closeBrackets(),
			// autocompletion(),
			// keymap.of(closeBracketsKeymap),
			// keymap.of(completionKeymap),
			markdown(),
			mdKeymap,
			EditorView.lineWrapping,
			customTheme
		]}
		styles={{}}
		bind:value
	/>
</div>

<style>
	.code-mirror-container {
		max-height: 50rem;
		overflow-y: scroll;
		border: 2px solid black;
		border-radius: 0.2rem;
	}
</style>
