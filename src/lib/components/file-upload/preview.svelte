<script context="module" lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	export type PreviewContext = Writable<boolean>;

	export interface PreviewProps extends HTMLAttributes<HTMLDivElement> {
		className?: string;
		type?: 'preview' | 'source';
	}
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let className: PreviewProps['className'] = undefined;

	export { className as class };

	let previewCode = writable(true);

	setContext<PreviewContext>('preview', previewCode);
</script>

<div {...$$props} class={className}>
	<slot
		toggle={() => {
			previewCode.set(!$previewCode);
		}}
	/>
</div>
