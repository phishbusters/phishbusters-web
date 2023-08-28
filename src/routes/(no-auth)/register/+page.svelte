<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input, CheckBox, Button, LoadingIcon } from '$lib/components';
	import ErrorLabel from '$lib/components/error-label/error-label.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let isLoading = false;
	let tcChecked = false;
	function onEnhanceSubmit() {
		isLoading = true;

		return async ({ update }: { update: () => Promise<void> }) => {
			await update();
			isLoading = false;
		};
	}
</script>

<div class="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
	<div
		class="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto"
	>
		<h2 class="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">Regístrate</h2>
		<div class="mt-2 text-center intro-x text-slate-400 dark:text-slate-400 xl:hidden">
			Potencia la seguridad de tu empresa en línea. Simplifica el manejo de tus activos digitales
			con nuestra plataforma especializada. Registra tu empresa ahora y fortalece tu defensa contra
			el phishing y las amenazas en línea.
		</div>
		<form action="/register" method="POST" use:enhance={onEnhanceSubmit}>
			<div class="mt-8 intro-x">
				<Input
					id="companyName"
					name="companyName"
					type="text"
					class="block px-4 py-3 intro-x min-w-full xl:min-w-[350px]"
					placeholder="Nombre de la compania"
					value={form?.data?.companyName || undefined}
				/>
				{#if form?.errors?.companyName}
					<ErrorLabel class="mt-2" message="El nombre de la compania es obligatorio" />
				{/if}
				<Input
					id="username"
					name="username"
					type="text"
					class="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
					placeholder="Email"
					value={form?.data?.username || ''}
				/>
				{#if form?.errors?.username}
					<ErrorLabel class="mt-2" message="El email ingresado no es correcto." />
				{/if}
				<Input
					id="password"
					name="password"
					type="password"
					class="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
					placeholder="Contraseña"
					value={form?.data?.password || ''}
				/>
				{#if form?.errors?.password}
					<ErrorLabel class="mt-2" message="La contraseña no es lo suficientemente segura" />
				{/if}
				<div class="grid w-full h-1 grid-cols-12 gap-4 mt-3 intro-x">
					<div class="h-full col-span-3 rounded bg-success" />
					<div class="h-full col-span-3 rounded bg-success" />
					<div class="h-full col-span-3 rounded bg-success" />
					<div class="h-full col-span-3 rounded bg-slate-100 dark:bg-darkmode-800" />
				</div>
				<a href="#top" class="block mt-2 text-xs intro-x text-slate-500 sm:text-sm">
					¿Que es una contraseña segura?
				</a>
				<Input
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					class="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
					placeholder="Confirma tu contraseña"
					value={form?.data?.confirmPassword || undefined}
				/>
				{#if form?.errors?.confirmPassword}
					<ErrorLabel class="mt-2" message="La contraseñas no coinciden" />
				{/if}
			</div>
			<div
				class="flex items-center mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm"
			>
				<CheckBox
					value={form?.data?.rememberMe || undefined}
					name="rememberMe"
					id="rememberMe"
					type="checkbox"
					class="mr-2 border"
				/>
				<label class="cursor-pointer select-none" for="rememberMe">
					Estoy de acuerdo con<a class="ml-1 text-primary dark:text-slate-200" href="#top">
						los terminos y condiciones
					</a>de phishbusters .</label
				>
			</div>
			{#if form?.errors?.rememberMe}
				<ErrorLabel class="mt-2" message="Debes aceptar terminos y condiciones" />
			{/if}
			<div class="mt-5 text-center intro-x xl:mt-8 xl:text-left">
				{#if form?.errors?.apiError}
					<ErrorLabel
						class="mb-2 text-left"
						message={form?.errors?.apiError || 'Ocurrio un error inesperado.'}
					/>
				{/if}
				<Button type="submit" variant="primary" class="w-full px-4 py-3 align-top xl:w-32 xl:mr-3">
					{#if !isLoading}
						Crear cuenta
					{:else}
						<LoadingIcon icon="oval" color="white" class="w-4 h-4 ml-2" />
					{/if}</Button
				>
				<Button
					as="a"
					href="/login"
					variant="outline-secondary"
					class="w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0"
				>
					Iniciar sesión
				</Button>
			</div>
		</form>
	</div>
</div>
