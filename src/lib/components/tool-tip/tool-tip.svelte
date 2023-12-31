<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import tippy, {
		type PopperElement,
		type Props,
		roundArrow,
		animateFill as animateFillPlugin
	} from 'tippy.js';
	import { onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import Component from '../svelte-component/component.svelte';

	interface TippyProps extends HTMLAttributes<HTMLSpanElement> {
		className?: string;
		content: string;
		disable?: boolean;
		as?: string | typeof SvelteComponent;
		options?: Partial<Props>;
		ref?: PopperElement;
	}

	let className: TippyProps['className'] = undefined;
	let content: TippyProps['content'];
	let disable: TippyProps['disable'] = false;
	let as: string | typeof SvelteComponent = 'span';
	let options: TippyProps['options'] = {};
	let ref: TippyProps['ref'] = undefined;

	export { className as class, content, disable, as, options, ref };

	let tippyRef: PopperElement;

	$: {
		if (tippyRef && tippyRef._tippy !== undefined) {
			disable ? tippyRef._tippy.disable() : tippyRef._tippy.enable();
		}
	}

	const init = (el: PopperElement, props: TippyProps) => {
		tippy(el, {
			plugins: [animateFillPlugin],
			content: props.content,
			arrow: roundArrow,
			popperOptions: {
				modifiers: [
					{
						name: 'preventOverflow',
						options: {
							rootBoundary: 'viewport'
						}
					}
				]
			},
			animateFill: false,
			animation: 'shift-away',
			...props.options
		});
	};

	onMount(() => {
		if (tippyRef) {
			ref = tippyRef;
			init(tippyRef, { content, options });
		}
	});
</script>

<Component
	{...$$props}
	{as}
	bind:ref={tippyRef}
	class={twMerge(['cursor-pointer', className])}
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
