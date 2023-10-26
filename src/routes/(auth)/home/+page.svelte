<script lang="ts">
	import clsx from 'clsx';
	import { goto } from '$app/navigation';
	import {
		BarChart,
		LineChart,
		PieChart,
		Button,
		StackedBarChart,
		LucideIcons
	} from '$lib/components';
	import { stepper as onboardingState } from '$lib/stores/onboarding';
	import type { PageData } from './$types';
	import {
		parseDateTommDDyyyy,
		toDataSet,
		toMultipleDataSet,
		transformDataToLineChart,
		transformDataToStackedBarChart
	} from '$lib/utils/chart-utils';
	import Alert from '$lib/components/alert/alert.svelte';
	import Link from '$lib/components/link/link.svelte';

	export let data: PageData;

	let validatedUserSign = false;
	let test = data.stats.lastSevenDays.concat();
	test = test.map((item) => {
		item.complaintsNotExecuted = 10;
		return item;
	});

	const effectivenessRate = test.reduce(
		(acc, item) => {
			acc.totalComplaints += item.complaintsExecuted + item.complaintsNotExecuted;
			acc.successfulComplaints += item.complaintsExecuted;
			return acc;
		},
		{ totalComplaints: 0, successfulComplaints: 0 }
	);

	const effectivenessRatePercentage =
		effectivenessRate.successfulComplaints === 0 || effectivenessRate.totalComplaints === 0
			? 0
			: (effectivenessRate.successfulComplaints / effectivenessRate.totalComplaints) * 100;

	const effectivenessRatePercentageFormatted = effectivenessRatePercentage.toFixed(2) + '%';

	function navigateToOnboarding() {
		onboardingState.reset();
		goto('/onboarding');
	}

	function validateUserSign() {
		goto('/documents');
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
	{#if data.showSignAlert && !validatedUserSign}
		<div>
			<Alert variant="pending" class="mb-2">
				Para poder representarte frente a las redes sociales y ejecutar denuncias en tu nombre,
				necesitamos que aceptes nuestra Carta Política.
				<Link label="Haga click aqui para autorizarnos" onClick={validateUserSign} />
			</Alert>
		</div>
	{/if}
	<div class="p-6 flex flex-col">
		<div class="col-span-12 mt-8">
			<div class="flex items-center h-10 intro-y">
				<h2 class="mr-5 text-lg font-medium truncate">Reporte general</h2>
			</div>
			<div class="grid grid-cols-12 gap-6 mt-5">
				<div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
					<div>
						<div class="p-5 box">
							<div class="flex">
								<LucideIcons icon="Ban" class="w-[28px] h-[28px] text-primary" />
							</div>
							<div class="mt-6 text-3xl font-medium leading-8">
								{data.stats.sinceCreation.totalFakeProfiles}
							</div>
							<div class="mt-1 text-base text-slate-500">Cantidad de Take Downs</div>
						</div>
					</div>
				</div>
				<div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
					<div>
						<div class="p-5 box">
							<div class="flex">
								<LucideIcons icon="UserX" class="w-[28px] h-[28px] text-pending" />
							</div>
							<div class="mt-6 text-3xl font-medium leading-8">
								{data.stats.sinceCreation.totalPhishingChats}
							</div>
							<div class="mt-1 text-base text-slate-500">Cantidad de Perfiles Falsos</div>
						</div>
					</div>
				</div>
				<div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
					<div>
						<div class="p-5 box">
							<div class="flex">
								<LucideIcons icon="MessageSquare" class="w-[28px] h-[28px] text-warning" />
							</div>
							<div class="mt-6 text-3xl font-medium leading-8">
								{data.stats.sinceCreation.totalComplaints}
							</div>
							<div class="mt-1 text-base text-slate-500">Intentos de Phishing por Chat</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-span-12 mt-8 lg:col-span-6">
			<div class="items-center block h-10 intro-y sm:flex">
				<h2 class="mr-1 text-lg font-medium truncate">Cantidad de Phishing Detectados</h2>
				<div class="relative mt-3 sm:mt-0 text-slate-500">
					<LucideIcons icon="Info" class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3" />
				</div>
			</div>
			<div class="p-5 mt-12 intro-y box sm:mt-5">
				<div
					class={clsx([
						'relative',
						"before:content-[''] before:block before:absolute before:w-16 before:left-0 before:top-0 before:bottom-0 before:ml-10 before:mb-7 before:bg-gradient-to-r before:from-white before:via-white/80 before:to-transparent before:dark:from-darkmode-600",
						"after:content-[''] after:block after:absolute after:w-16 after:right-0 after:top-0 after:bottom-0 after:mb-7 after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:dark:from-darkmode-600"
					])}
				>
					<LineChart
						data={transformDataToLineChart(
							toDataSet(
								data.stats.lastSevenDays,
								'date',
								'phishingChatsDetected',
								'Cantidad de Phishing Detectados',
								parseDateTommDDyyyy
							)
						)}
						height={400}
					/>
				</div>
			</div>
		</div>

		<div class="col-span-12 mt-8 lg:col-span-6">
			<div class="items-center block h-10 intro-y sm:flex">
				<h2 class="mr-1 text-lg font-medium truncate">Cantidad de Cuentas Fraudulentas</h2>
				<div class="relative mt-3 sm:mt-0 text-slate-500">
					<LucideIcons icon="Info" class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3" />
				</div>
			</div>
			<div class="p-5 mt-12 intro-y box sm:mt-5">
				<div
					class={clsx([
						'relative',
						"before:content-[''] before:block before:absolute before:w-16 before:left-0 before:top-0 before:bottom-0 before:ml-10 before:mb-7 before:bg-gradient-to-r before:from-white before:via-white/80 before:to-transparent before:dark:from-darkmode-600",
						"after:content-[''] after:block after:absolute after:w-16 after:right-0 after:top-0 after:bottom-0 after:mb-7 after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:dark:from-darkmode-600"
					])}
				>
					<LineChart
						data={transformDataToLineChart(
							toDataSet(
								data.stats.lastSevenDays,
								'date',
								'fakeProfilesDetected',
								'Cantidad de perfiles falsos detectados',
								parseDateTommDDyyyy
							)
						)}
						height={400}
					/>
				</div>
			</div>
		</div>

		<div class="col-span-12 mt-8 lg:col-span-6">
			<div class="items-center block h-10 intro-y sm:flex">
				<h2 class="mr-1 text-lg font-medium truncate">Efectividad del Take Down</h2>
				<div class="relative mt-3 sm:mt-0 text-slate-500">
					<LucideIcons icon="Info" class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3" />
				</div>
			</div>
			<div class="p-5 mt-12 intro-y box sm:mt-5">
				<div class="flex flex-col md:flex-row md:items-center">
					<div class="flex">
						<div>
							<div class="text-lg font-medium text-primary dark:text-slate-300 xl:text-xl">
								{effectivenessRatePercentageFormatted}
							</div>
							<div class="mt-0.5 text-slate-500">Porcentaje de efectividad</div>
						</div>
						<div
							class="w-px h-12 mx-4 border border-r border-dashed border-slate-200 dark:border-darkmode-300 xl:mx-5"
						/>
					</div>
				</div>
				<div
					class={clsx([
						'relative',
						"before:content-[''] before:block before:absolute before:w-16 before:left-0 before:top-0 before:bottom-0 before:ml-10 before:mb-7 before:bg-gradient-to-r before:from-white before:via-white/80 before:to-transparent before:dark:from-darkmode-600",
						"after:content-[''] after:block after:absolute after:w-16 after:right-0 after:top-0 after:bottom-0 after:mb-7 after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:dark:from-darkmode-600"
					])}
				>
					<StackedBarChart
						data={transformDataToStackedBarChart(
							toMultipleDataSet(
								test,
								'date',
								['complaintsExecuted', 'complaintsNotExecuted'],
								[
									'Cantidad de take downs realizados con exito',
									'Cantidad de take downs realizados sin exito'
								],
								parseDateTommDDyyyy
							)
						)}
						height={400}
					/>
				</div>
			</div>
		</div>

		<div class="col-span-12 mt-8 lg:col-span-6">
			<div class="items-center block h-10 intro-y sm:flex">
				<h2 class="mr-1 text-lg font-medium truncate">Phishing Validados por los Usuarios</h2>
				<div class="relative mt-3 sm:mt-0 text-slate-500">
					<LucideIcons icon="Info" class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3" />
				</div>
			</div>
			<div class="p-5 mt-12 intro-y box sm:mt-5">
				<div
					class={clsx([
						'relative',
						"before:content-[''] before:block before:absolute before:w-16 before:left-0 before:top-0 before:bottom-0 before:ml-10 before:mb-7 before:bg-gradient-to-r before:from-white before:via-white/80 before:to-transparent before:dark:from-darkmode-600",
						"after:content-[''] after:block after:absolute after:w-16 after:right-0 after:top-0 after:bottom-0 after:mb-7 after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:dark:from-darkmode-600"
					])}
				>
					<PieChart height={400} />
				</div>
			</div>
		</div>

		<div class="col-span-12 mt-8 lg:col-span-6">
			<div class="items-center block h-10 intro-y sm:flex">
				<h2 class="mr-1 text-lg font-medium truncate">Falsos Positivos Detectados</h2>
				<div class="relative mt-3 sm:mt-0 text-slate-500">
					<LucideIcons icon="Info" class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3" />
				</div>
			</div>
			<div class="p-5 mt-12 intro-y box sm:mt-5">
				<div
					class={clsx([
						'relative',
						"before:content-[''] before:block before:absolute before:w-16 before:left-0 before:top-0 before:bottom-0 before:ml-10 before:mb-7 before:bg-gradient-to-r before:from-white before:via-white/80 before:to-transparent before:dark:from-darkmode-600",
						"after:content-[''] after:block after:absolute after:w-16 after:right-0 after:top-0 after:bottom-0 after:mb-7 after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:dark:from-darkmode-600"
					])}
				>
					<BarChart height={400} />
				</div>
			</div>
		</div>

		<div class="col-span-12 mt-8 lg:col-span-6">
			<div class="items-center block h-10 intro-y sm:flex">
				<h2 class="mr-1 text-lg font-medium truncate">Tasa de Interacción Post Alerta</h2>
				<div class="relative mt-3 sm:mt-0 text-slate-500">
					<LucideIcons icon="Info" class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3" />
				</div>
			</div>
			<div class="p-5 mt-12 intro-y box sm:mt-5">
				<div
					class={clsx([
						'relative',
						"before:content-[''] before:block before:absolute before:w-16 before:left-0 before:top-0 before:bottom-0 before:ml-10 before:mb-7 before:bg-gradient-to-r before:from-white before:via-white/80 before:to-transparent before:dark:from-darkmode-600",
						"after:content-[''] after:block after:absolute after:w-16 after:right-0 after:top-0 after:bottom-0 after:mb-7 after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:dark:from-darkmode-600"
					])}
				>
					<LineChart height={400} />
				</div>
			</div>
		</div>
	</div>
{/if}
