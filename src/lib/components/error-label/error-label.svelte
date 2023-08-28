<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let message: string;
	let className: string = '';

	export { className as class };
</script>

<div class={twMerge(['text-red-500 text-sm font-medium', className])}>
	{message}
</div>
