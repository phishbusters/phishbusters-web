<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { sideBarStore } from '$lib/stores/sidebar';
	import clsx from 'clsx';
	import { onMount } from 'svelte';
	import { AppLogo } from '$lib/components';
	import { nestedMenu, type FormattedMenu, linkTo } from './side-menu';
	import ToolTip from '../tool-tip/tool-tip.svelte';
	import Lucide from '../lucide-icons/lucide.svelte';

	let windowWidth = 0;

	let formattedMenu: Array<FormattedMenu | 'divider'> = [];
	const sideMenu = () => nestedMenu($sideBarStore.menu, $page.url);

	$: {
		if ($sideBarStore || $page.url) {
			formattedMenu = sideMenu();
		}
	}

	onMount(() => {
		if (browser) {
			windowWidth = window.innerWidth;
			window?.addEventListener('resize', () => {
				windowWidth = window.innerWidth;
			});
		}
	});
</script>

<nav class="side-nav z-10 hidden overflow-x-hidden px-5 pb-16 md:block md:w-[105px] xl:w-[250px]">
	<a class="flex items-center pt-4 pl-5 mt-3 intro-x" href="#top">
		<AppLogo />
	</a>
	<div class="my-6 side-nav__divider" />
	<ul>
		{#each formattedMenu as menu, menuKey}
			{#if menu == 'divider'}
				<li
					class={clsx([
						'side-nav__divider my-6',

						// Animation
						`opacity-0 animate-[0.4s_ease-in-out_0.1s_intro-divider] animate-fill-mode-forwards animate-delay-${
							(menuKey + 1) * 10
						}`
					])}
				/>
			{:else}
				<li>
					<ToolTip
						as="a"
						content={menu.title}
						options={{
							placement: 'right'
						}}
						disable={windowWidth > 1260}
						href={menu.subMenu ? 'javascript:;' : menu.pathname}
						on:click={(e) => {
							e.preventDefault();
							menu !== 'divider' && linkTo(menu);
							formattedMenu = [...formattedMenu];
						}}
						class={clsx([
							menu.active ? 'side-menu side-menu--active' : 'side-menu',

							// Animation
							!menu.active && [
								`opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay-${
									(menuKey + 1) * 10
								}`
							]
						])}
					>
						<div class="side-menu__icon">
							<Lucide icon={menu.icon} />
						</div>
						<div class="side-menu__title">
							{menu.title}
							{#if menu.subMenu}
								<div
									class={clsx([
										'side-menu__sub-icon',
										menu.activeDropdown && 'transform rotate-180'
									])}
								>
									<Lucide icon="ChevronDown" />
								</div>
							{/if}
						</div>
					</ToolTip>
					{#if menu.subMenu && menu.activeDropdown}
						<ul class={clsx([menu.activeDropdown && 'side-menu__sub-open'])}>
							{#each menu.subMenu as subMenu, subMenuKey}
								<li>
									<ToolTip
										as="a"
										content={subMenu.title}
										options={{
											placement: 'right'
										}}
										disable={windowWidth > 1260}
										href={subMenu.subMenu ? 'javascript:;' : subMenu.pathname}
										class={clsx([
											subMenu.active ? 'side-menu side-menu--active' : 'side-menu',

											// Animation
											!subMenu.active && [
												`opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay-${
													(subMenuKey + 1) * 10
												}`
											]
										])}
										on:click={(e) => {
											e.preventDefault();
											linkTo(subMenu);
											formattedMenu = [...formattedMenu];
										}}
									>
										<div class="side-menu__icon">
											<Lucide icon={subMenu.icon} />
										</div>
										<div class="side-menu__title">
											{subMenu.title}
											{#if subMenu.subMenu}
												<div
													class={clsx([
														'side-menu__sub-icon',
														subMenu.activeDropdown && 'transform rotate-180'
													])}
												>
													<Lucide icon="ChevronDown" />
												</div>
											{/if}
										</div>
									</ToolTip>
									{#if subMenu.subMenu && subMenu.activeDropdown}
										<ul class={clsx([subMenu.activeDropdown && 'side-menu__sub-open'])}>
											{#each subMenu.subMenu as lastSubMenu, lastSubMenuKey}
												<li>
													<ToolTip
														as="a"
														content={lastSubMenu.title}
														options={{
															placement: 'right'
														}}
														disable={windowWidth > 1260}
														href={lastSubMenu.subMenu ? 'javascript:;' : lastSubMenu.pathname}
														class={clsx([
															lastSubMenu.active ? 'side-menu side-menu--active' : 'side-menu',

															// Animation
															!lastSubMenu.active && [
																`opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay-${
																	(lastSubMenuKey + 1) * 10
																}`
															]
														])}
														on:click={(e) => {
															e.preventDefault();
															linkTo(lastSubMenu);
															formattedMenu = [...formattedMenu];
														}}
													>
														<div class="side-menu__icon">
															<Lucide icon={lastSubMenu.icon} />
														</div>
														<div class="side-menu__title">
															{lastSubMenu.title}
														</div>
													</ToolTip>
												</li>
											{/each}
										</ul>
									{/if}
								</li>
							{/each}
						</ul>
					{/if}
				</li>
			{/if}
		{/each}
	</ul>
</nav>
