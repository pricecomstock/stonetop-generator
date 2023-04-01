<script lang="ts">
	import { majorArcanum } from '$lib/stores/majorArcanum';

	import MajorArcanum from '$lib/components/MajorArcanum.svelte';
	import { RenderMode } from '$lib/util/renderMode';

	let imgOutputNode: HTMLElement;
</script>

<MajorArcanum renderMode={RenderMode.PDF_PRINT} majorArcanum={$majorArcanum} {imgOutputNode} />
