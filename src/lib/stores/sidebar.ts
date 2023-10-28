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
			icon: 'FileText',
			title: 'Carta de representación',
			pathname: '/documents'
		},
		{
			icon: 'RadarIcon',
			pathname: '/take-downs',
			title: 'Perfiles identificados'
		},
		{
			icon: 'Settings',
			pathname: '/active-assets',
			title: 'Mis activos digitales'
		},
		{
			icon: 'LogOut',
			pathname: '/logout',
			title: 'Cerrar sesión'
		}
	]
});
