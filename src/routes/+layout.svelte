<script lang="ts">
	import '../app.css';
	import './public-sans.css';
	import './styles.css';

	const style = {
		container: `h-screen relative`
	};
</script>

<div class={style.container}>
	<slot />
</div>
