<script lang="ts">
	export let label: string;
	export let href: string = '#';
	export let onClick: (() => void) | undefined;
</script>

<a
	{href}
	on:click={onClick}
	class="text-blue-600 transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
	>{label}</a
>
