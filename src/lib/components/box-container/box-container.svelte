<script lang="ts">
	export let title: string;
	export let justify:
		| 'justify-start'
		| 'justify-center'
		| 'justify-end'
		| 'justify-between'
		| 'justify-around'
		| 'justify-evenly' = 'justify-evenly';
</script>

<div class="box flex flex-col p-3 flex-1 mb-4">
	<div class="mr-3 text-lg font-medium truncate mt-2 mb-2">{title}</div>
	<div class="flex flex-wrap items-center flex-1 gap-3 pb-3 {justify}">
		<slot />
	</div>
</div>
