import { writable } from 'svelte/store';
import type { Icon } from '$lib/components/lucide-icons/lucide.svelte';

export interface Menu {
	icon: Icon;
	title: string;
	pathname?: string;
	subMenu?: Menu[];
	ignore?: boolean;
}

export interface SideMenuState {
	menu: Array<Menu | 'divider'>;
}

export const sideBarStore = writable<SideMenuState>({
	menu: [
		{
			icon: 'Home',
			title: 'Inicio',
			pathname: '/'
		},
		{
			icon: 'Settings',
			pathname: '/active-assets',
			title: 'Mis activos digitales'
		}
	]
});
