<script context="module" lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
		className?: string;
		type?: 'preview' | 'source';
	}
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import type { PreviewContext } from './preview.svelte';

	let className: PanelProps['className'] = undefined;
	let type: PanelProps['type'] = 'preview';

	export { className as class, type };

	const preview = getContext<PreviewContext>('preview');
</script>

{#if (type == 'preview' && $preview) || (type == 'source' && !$preview)}
	<div {...$$props} class={className}>
		<slot />
	</div>
{/if}
