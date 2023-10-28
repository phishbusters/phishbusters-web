<script context="module" lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	export type TheadContext = {
		variant?: 'default' | 'light' | 'dark';
	};

	interface TheadProps extends HTMLAttributes<HTMLTableSectionElement> {
		className?: string;
		variant?: 'default' | 'light' | 'dark';
	}
</script>

<script lang="ts">
	import { setContext } from 'svelte';

	let className: TheadProps['className'] = undefined;
	let variant: TheadProps['variant'] = 'default';

	export { className as class, variant };

	setContext<TheadContext>('thead', {
		variant
	});
</script>

<thead
	{...$$props}
	class={twMerge([
		variant === 'light' && 'bg-slate-200/60 dark:bg-slate-200',
		variant === 'dark' && 'bg-dark text-white dark:bg-black/30',
		className
	])}
>
	<slot />
</thead>
