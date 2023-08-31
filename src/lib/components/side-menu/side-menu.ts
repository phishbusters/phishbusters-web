import type { Menu } from '$lib/stores/sidebar';
import { goto } from '$app/navigation';

interface Location {
	pathname: string;
}

export interface FormattedMenu extends Menu {
	active?: boolean;
	activeDropdown?: boolean;
	subMenu?: FormattedMenu[];
}

// Setup side menu
const findActiveMenu = (subMenu: Menu[], location: Location): boolean => {
	let match = false;
	subMenu.forEach((item) => {
		if (item.pathname === location.pathname && !item.ignore) {
			match = true;
		} else if (!match && item.subMenu) {
			match = findActiveMenu(item.subMenu, location);
		}
	});
	return match;
};

const nestedMenu = (menu: Array<Menu | 'divider'>, location: Location) => {
	const formattedMenu: Array<FormattedMenu | 'divider'> = [];
	menu.forEach((item) => {
		if (typeof item !== 'string') {
			const menuItem: FormattedMenu = {
				icon: item.icon,
				title: item.title,
				pathname: item.pathname,
				subMenu: item.subMenu,
				ignore: item.ignore
			};
			menuItem.active =
				(menuItem.pathname === location.pathname ||
					(menuItem.subMenu && findActiveMenu(menuItem.subMenu, location))) &&
				!menuItem.ignore;

			if (menuItem.subMenu) {
				menuItem.activeDropdown = findActiveMenu(menuItem.subMenu, location);

				// Nested menu
				const subMenu: Array<FormattedMenu> = [];
				nestedMenu(menuItem.subMenu, location).map(
					(menu) => typeof menu !== 'string' && subMenu.push(menu)
				);
				menuItem.subMenu = subMenu;
			}

			formattedMenu.push(menuItem);
		} else {
			formattedMenu.push(item);
		}
	});

	return formattedMenu;
};

const linkTo = (menu: FormattedMenu) => {
	if (menu.subMenu) {
		menu.activeDropdown = !menu.activeDropdown;
	} else {
		if (menu.pathname !== undefined) {
			goto(menu.pathname);
		}
	}
};

export { nestedMenu, linkTo };
