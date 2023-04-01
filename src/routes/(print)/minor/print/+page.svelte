<script lang="ts">
	import { minorArcanum } from '$lib/stores/minorArcanum';

	import { RenderMode } from '$lib/util/renderMode';
	import MinorArcanum from '$lib/components/MinorArcanum.svelte';

	let imgOutputNode: HTMLElement;
</script>

<MinorArcanum renderMode={RenderMode.PDF_PRINT} minorArcanum={$minorArcanum} {imgOutputNode} />
