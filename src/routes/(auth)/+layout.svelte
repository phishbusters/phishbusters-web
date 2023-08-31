<script lang="ts">
	// import TopBar from "../../components/TopBar";
	// import MobileMenu from "../../components/MobileMenu";
	import clsx from 'clsx';
	import SideMenu from '$lib/components/side-menu/side-menu.svelte';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;
</script>

<div class="-mx-3 bg-black/[0.15] py-5 px-3 sm:-mx-8 sm:px-8 md:py-0">
	<!-- <MobileMenu /> -->
	<div class="mt-[4.7rem] flex overflow-hidden md:mt-0">
		{#if data.showNavbar}
			<SideMenu />
		{/if}
		<div
			class={clsx([
				'rounded-[30px] md:rounded-[35px/50px_0px_0px_0px] min-w-0 min-h-screen max-w-full md:max-w-none bg-slate-100 flex-1 pb-10 px-4 md:px-6 relative md:ml-4 ',
				"before:content-[''] before:w-full before:h-px before:block",
				"after:content-[''] after:z-[-1] after:rounded-[40px_0px_0px_0px] after:w-full after:inset-y-0 after:absolute after:left-0 after:bg-white/10 after:mt-8 after:-ml-4"
			])}
		>
			<!-- <TopBar /> -->
			<slot />
		</div>
	</div>
</div>
