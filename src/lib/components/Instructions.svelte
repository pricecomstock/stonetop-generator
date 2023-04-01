<script>
	import { marked } from '$lib/stonetop-markdown/marked-extension';
	const examples = [
		'*italic*',
		'**bold**',
		'***both***',
		'- Regular bullets\n- For choices\n- Or lists',
		'\\mm swallow someone whole\n\\mm or other monster moves\n\\gmm GM moves too',
		'\\check a simple task',
		'When you ***use a list***, reduce extra spacing\nand fix indentation:\n\n{{list\n\\check2 option number one\ngoes on for a while and wraps to the next line\n\\check option number two\n}}',
		'Lists also work with other items:\n{{list\n\\mm option number one is a bit longer and wraps around\n\\mm option number two\n}}',
		'Create indented sections using indent tags\n##### \\check decent move\nDescription\n{{indent\n##### \\check powerful submove\nPowerful description\n}}',
		'"prog" is separated to center when on its own line\n\n\\prog4\n\nOtherwise inline \\prog3\n\nHold also works \\hold2',
		'## Charge Collecting Arcana\n\n\\mark3 Charges\n\nSpecial syntax for the bubbles at the top of an arcana',
		'Inline Load \\load2',
		'# H1 Title',
		'## H2 Mysteries',
		'### H3 Section',
		'#### H4 Subsection',
		'##### H5 Move',
		'##### \\check Selectable move',
		'##### \\check Move with Hold \\prog4\n\n##### \\check Move with Hold \\hold2',
		"###### H6 This isn't for anything yet",
		'Try taking notes in this blank space\n::::\nPretty neat!',
		'an image\n![](https://placehold.co/200x100)',
		'|1d6|result|\n|---|---|\n|1-2|really bad|\n|3-4|pretty ok|\n|5-6|quite good|'
	];
</script>

<table class="examples">
	<thead>
		<tr>
			<th>Input</th>
			<th>Output</th>
		</tr>
	</thead>
	{#each examples as example}
		<tr class="example">
			<td class="input"><pre>{example}</pre></td>
			<td class="output md-render">
				{@html marked(example)}
			</td>
		</tr>
	{/each}
</table>

<style lang="postcss">
	table {
		width: 100%;
		border-collapse: collapse;
	}
	.output {
		font-size: 1.25rem;
	}

	th {
		font-family: 'FellTypeSC Roman';
		text-transform: lowercase;
		font-size: 2rem;
	}

	td {
		padding: 0.5rem;
		border: 1px solid black;
	}
</style>
