<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	import TopBar from '$lib/components/top-bar/top-bar.svelte';
	import Overlay from '$lib/components/overlay/overlay.svelte';
	import Sidebar from '$lib/components/side-bar/side-bar.svelte';
	import { closeSidebar, sidebarOpen } from '$lib/stores/sidebar';

	/*	lg:w-[calc(100%-16rem)] class get the remained width of the main tag from lg:viewport by subtracting
	(the total width by the width of the Sidebar component which is w-64 = 16rem)*/
	const style = {
		mainContainer: `bg-[#25074d] flex flex-col h-screen pl-0 w-full lg:w-[calc(100%-16rem)]`,
		main: `bg-gray-100 h-screen overflow-auto pb-36 pt-4 px-2 md:pb-8 md:px-4 lg:px-6 lg:rounded-tl-3xl`
	};

	if (browser) {
		page.subscribe(() => {
			// close Sidebar on route changes. it's triggered when viewport is less than 1024px
			if ($sidebarOpen && window.innerWidth < 1024) {
				closeSidebar();
			}
		});
	}
</script>

<div class="flex items-start">
	<Overlay />
	<Sidebar mobileOrientation="end" />
	<div class={style.mainContainer}>
		<TopBar />
		<main class={style.main}>
			<slot />
		</main>
	</div>
</div>
