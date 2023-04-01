<script>
	export let count = 1;
	export let note = '';
	$: output = '◇'.repeat(count).trim();
</script>

<div>
	<span class="load">{output}<span><span class="note">{note}</span></span></span>
</div>

<style>
	div {
		display: inline-block;
	}
	span.load {
		font-size: 1.25em;
	}

	span.note {
		font-size: 0.75em;
	}

	span {
		font-style: normal;
	}
</style>
