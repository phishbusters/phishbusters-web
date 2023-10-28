<script context="module" lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	interface TableProps extends HTMLAttributes<HTMLTableSectionElement> {
		className?: string;
	}
</script>

<script lang="ts">
	import type { TableContext } from './table.svelte';
	import { getContext } from 'svelte';

	let className: TableProps['className'] = undefined;

	export { className as class };

	const table = getContext<TableContext>('table');
</script>

<td
	{...$$props}
	class={twMerge([
		'px-5 py-3 border-b dark:border-darkmode-300',
		table?.bordered && 'border-l border-r border-t',
		table?.sm && 'px-4 py-2',
		className
	])}
>
	<slot />
</td>
