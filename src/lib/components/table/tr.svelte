<script context="module" lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	interface TrProps extends HTMLAttributes<HTMLTableSectionElement> {
		className?: string;
	}
</script>

<script lang="ts">
	import type { TableContext } from './table.svelte';
	import { getContext } from 'svelte';

	let className: TrProps['className'] = undefined;

	export { className as class };

	const table = getContext<TableContext>('table');
</script>

<tr
	{...$$props}
	class={twMerge([
		table?.hover && '[&:hover_td]:bg-slate-100',
		table?.striped && '[&:nth-of-type(odd)_td]:bg-slate-100',
		className
	])}
>
	<slot />
</tr>
