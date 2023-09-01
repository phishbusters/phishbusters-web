<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components';
	import LineChart from '$lib/components/line-chart/line-chart.svelte';
	import PieChart from '$lib/components/pie-chart/pie-chart.svelte';
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
	<div class="p-6 flex flex-col">
		<div class="mb-4">
			<h2 class="text-xl font-medium">Tu dashboard</h2>
		</div>
		<div class="w-full flex-1 flex flex-row items-start gap-12">
			<div class="w-5/12 box p-6">
				<div class="text-lg font-medium mt-2 mb-2">
					Cantidad de impersofinifaciones y perfiles falsos detectados en el último mes
				</div>
				<LineChart height={400} />
			</div>
			<div class="w-5/12 box p-6">
				<div class="text-lg font-medium mt-2 mb-2">
					Redes sociales con más incidencias en el último mes
				</div>
				<PieChart height={400} />
			</div>
		</div>
	</div>
{/if}
