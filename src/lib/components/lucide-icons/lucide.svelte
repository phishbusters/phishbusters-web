<script context="module" lang="ts">
	import type { SVGAttributes } from 'svelte/elements';
	import {
		Info,
		HeartPulse,
		Network,
		Mail,
		Phone,
		PictureInPicture,
		Home,
		Settings,
		CheckCircle2,
		Circle,
		ArrowLeft
	} from 'lucide-svelte';
	import { twMerge } from 'tailwind-merge';

	const selectedLucideIcons = {
		Info,
		HeartPulse,
		Network,
		Mail,
		Phone,
		PictureInPicture,
		Home,
		Settings,
		CheckCircle2,
		Circle,
		ArrowLeft
	};

	export type Icon = keyof typeof selectedLucideIcons;
	export interface LucideProps extends SVGAttributes<SVGSVGElement> {
		className?: string;
		icon: Icon;
	}
</script>

<script lang="ts">
	let className: LucideProps['className'] = undefined;
	let icon: LucideProps['icon'];

	export { className as class, icon };
</script>

<svelte:component
	this={selectedLucideIcons[icon]}
	class={twMerge(['stroke-[1.3] w-[1.4rem] h-[1.4rem]', className])}
/>
