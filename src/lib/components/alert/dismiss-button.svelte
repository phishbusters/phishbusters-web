<script context="module" lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import Component from '../svelte-component/component.svelte';

	export interface DismissButtonProps {
		as?: string | typeof SvelteComponent;
		className?: string;
	}
</script>

<script lang="ts">
	let as: DismissButtonProps['as'] = 'button';
	let className: DismissButtonProps['className'] = undefined;

	export { as, className as class };

	const computedClass = twMerge([
		'text-slate-800 py-2 px-3 absolute right-0 my-auto mr-2',
		className
	]);
</script>

<Component
	{...$$props}
	type="button"
	aria-label="Close"
	{as}
	class={computedClass}
	on:blur
	on:change
	on:contextmenu
	on:focus
	on:input
	on:invalid
	on:reset
	on:select
	on:submit
	on:keydown
	on:keypress
	on:keyup
	on:click
	on:dblclick
	on:mousedown
	on:mousemove
	on:mouseout
	on:mouseover
	on:mouseup
	on:wheel
>
	<slot />
</Component>
