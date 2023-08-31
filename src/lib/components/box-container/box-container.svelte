<script lang="ts">
	export let title: string;
</script>

<div class="box flex flex-col p-3 flex-1 mb-4">
	<div class="mr-3 text-lg font-medium truncate mt-2 mb-2">{title}</div>
	<div class="flex items-center justify-evenly flex-1 gap-3 pb-3">
		<slot />
	</div>
</div>
