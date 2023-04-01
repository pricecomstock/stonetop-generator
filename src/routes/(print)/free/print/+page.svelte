<script lang="ts">
	import FreeOutput from '$lib/components/FreeOutput.svelte';
	import { freeMd } from '$lib/stores/free';
	import { RenderMode } from '$lib/util/renderMode';
</script>

<FreeOutput content={$freeMd} renderMode={RenderMode.PDF_PRINT} />
