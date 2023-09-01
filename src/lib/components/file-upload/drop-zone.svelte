<script context="module" lang="ts">
	import type DropzoneJs from 'dropzone';
	import type { DropzoneOptions } from 'dropzone';
	import { init } from './drop-zone';
	import { twMerge } from 'tailwind-merge';
	import type { HTMLCanvasAttributes } from 'svelte/elements';

	export interface DropzoneElement extends HTMLDivElement {
		dropzone: DropzoneJs;
	}

	export interface DropzoneProps extends HTMLCanvasAttributes {
		className?: string;
		options: DropzoneOptions;
		ref?: DropzoneElement;
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	let className: DropzoneProps['className'] = undefined;
	let options: DropzoneProps['options'];
	let ref: DropzoneProps['ref'] = undefined;

	export { className as class, options, ref };

	let fileUploadRef: DropzoneElement;

	onMount(() => {
		ref = fileUploadRef;
		init(fileUploadRef, { options });
	});

	const computedClass = twMerge([
		'[&.dropzone]:border-2 [&.dropzone]:border-dashed dropzone',
		className
	]);
</script>

<div {...$$props} bind:this={fileUploadRef} class={computedClass}>
	<div class="dz-message">
		<slot />
	</div>
</div>
