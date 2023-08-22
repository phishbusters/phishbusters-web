<script lang="ts">
	import 'tailwindcss/tailwind.css';

	const style = {
		container: `h-screen relative`
	};
</script>

<div class={style.container}>
	<slot />
</div>
