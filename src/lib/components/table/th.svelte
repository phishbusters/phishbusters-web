<script context="module" lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	interface ThProps extends HTMLAttributes<HTMLTableSectionElement> {
		className?: string;
	}
</script>

<script lang="ts">
	import type { TableContext } from './table.svelte';
	import type { TheadContext } from './thead.svelte';
	import { getContext } from 'svelte';

	let className: ThProps['className'] = undefined;

	export { className as class };

	const table = getContext<TableContext>('table');
	const thead = getContext<TheadContext>('table');
</script>

<th
	{...$$props}
	class={twMerge([
		'font-medium px-5 py-3 border-b-2',
		thead?.variant === 'light' && 'border-b-0 text-slate-700',
		thead?.variant === 'dark' && 'border-b-0',
		table?.bordered && 'border-l border-r border-t',
		table?.sm && 'px-4 py-2',
		className
	])}
>
	<slot />
</th>
