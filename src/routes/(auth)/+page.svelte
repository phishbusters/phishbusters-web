<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components';
	import type { PageData } from './$types';

	export let data: PageData;

	function navigateToOnboarding() {
		goto('/onboarding');
	}
</script>

{#if data.showOnboarding}
	<div class="flex flex-col justify-center items-center h-screen">
		<div>
			<h1 class="text-4xl font-bold">Bienvenidos a Phishbusters</h1>
		</div>
		<div class="w-1/2 mt-4 mb-4">
			<h5 class="text-lg text-center">
				¿Estás preparado para asistir a tus clientes en la prevención de ataques de phishing? <br />
				La información que requeriremos se utilizará para supervisar posibles intentos de phishing.
			</h5>
		</div>
		<Button on:click={navigateToOnboarding} variant="primary">Configurar activos digitales</Button>
	</div>
{:else}
	<div>Futuro dashboard</div>
{/if}
