<script context="module" lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface TbodyProps extends HTMLAttributes<HTMLTableSectionElement> {
		className?: string;
	}
</script>

<script lang="ts">
	let className: TbodyProps['className'] = undefined;

	export { className as class };
</script>

<tbody {...$$props} class={className}>
	<slot />
</tbody>
