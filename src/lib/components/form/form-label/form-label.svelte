<script context="module" lang="ts">
	import { getContext } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import type { FromInlineContext } from '../form-inline/form-inline.svelte';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	export interface FormLabelProps extends HTMLLabelAttributes {
		className?: string;
	}
</script>

<script lang="ts">
	let className: FormLabelProps['className'] = undefined;

	export { className as class };

	const formInline = getContext<FromInlineContext>('formInline');
</script>

<label
	{...$$props}
	class={twMerge([
		'inline-block mb-2',
		formInline && 'mb-2 sm:mb-0 sm:mr-5 sm:text-right',
		className
	])}
>
	<slot />
</label>
