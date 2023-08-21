<script>
	import { page } from '$app/stores';

	import HomeIcon from '../icons/home-icon.svelte';
	import MediasIcon from '../icons/medias-icon.svelte';
	import ContactIcon from '../icons/contact-icon.svelte';
	import ServersIcon from '../icons/servers-icon.svelte';
	import TerminalIcon from '../icons/terminal-icon.svelte';
	import SettingsIcon from '../icons/settings-icon.svelte';
	import RecycleBinIcon from '../icons/recycle-bin.svelte';
	import DocumentationIcon from '../icons/documentation-icon.svelte';

	const style = {
		inactive: `text-gray-400`,
		active: `font-medium text-white`,
		link: `flex items-center justify-start my-2 p-4 text-sm w-full hover:text-white`
	};

	const data = [
		{
			title: 'Users',
			icon: HomeIcon,
			link: '/'
		},
		{
			title: 'Medias',
			icon: MediasIcon,
			link: '/admin/medias'
		},
		{
			title: 'Contacts',
			icon: ContactIcon,
			link: '/admin/contacts'
		},
		{
			title: 'Servers',
			icon: ServersIcon,
			link: '/admin/servers'
		},
		{
			title: 'Settings',
			icon: SettingsIcon,
			link: '/admin/settings'
		},
		{
			title: 'Terminal',
			icon: TerminalIcon,
			link: '/admin/terminal'
		},
		{
			title: 'Recycle Bin',
			icon: RecycleBinIcon,
			link: '/admin/recycle-bin'
		},
		{
			title: 'Documentation',
			icon: DocumentationIcon,
			link: '/admin/documentation'
		}
	];
</script>

<ul class="md:pl-6">
	<li>
		{#each data as item (item.title)}
			<a
				href={item.link}
				class={`${style.link} ${item.link === $page.url.pathname ? style.active : style.inactive}`}
			>
				<span><svelte:component this={item.icon} /></span>
				<span class="mx-4">{item.title}</span>
			</a>
		{/each}
	</li>
</ul>
