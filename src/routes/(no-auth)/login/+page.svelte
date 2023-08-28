<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { Input, CheckBox, Button, ErrorLabel, Link, AppLogo, LoadingIcon } from '$lib/components';

	export let form: ActionData;

	let signInButtonLoading = false;
	function onEnhanceSubmit() {
		signInButtonLoading = true;

		return async ({ update }: { update: () => Promise<void> }) => {
			await update();
			signInButtonLoading = false;
		};
	}
</script>

<div class="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
	<div
		class="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto"
	>
		<h2 class="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
			Ingresá con tu cuenta
		</h2>
		<div class="mt-2 text-center intro-x text-slate-400 xl:hidden">
			Unos pasos más para acceder a tu cuenta. Protege tus activos digitales con nuestro software de
			detección de phishing respaldado por modelos de aprendizaje automático.
		</div>
		<form use:enhance={onEnhanceSubmit} method="POST" action="/login">
			<div class="mt-8 intro-x">
				<Input
					type="email"
					class="block px-4 py-3 intro-x min-w-full xl:min-w-[350px]"
					placeholder="Email"
					id="email"
					name="email"
					value={form?.email || ''}
				/>
				<Input
					type="password"
					class="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
					placeholder="Contraseña"
					id="password"
					name="password"
				/>
				{#if form?.errorMessage}
					<ErrorLabel class="mt-2" message={form?.errorMessage} />
				{/if}
			</div>
			<div class="flex mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
				<div class="flex items-center mr-auto">
					<CheckBox
						labelClassName="cursor-pointer select-none"
						id="remember-me"
						type="checkbox"
						class="mr-2 border"
					>
						Recordar mi cuenta
					</CheckBox>

					<label class="cursor-pointer select-none" for="remember-me">Recordarme</label>
				</div>
				<Link label="¿Olvidaste tu contraseña?" href="#top" />
			</div>
			<div class="mt-5 text-center intro-x xl:mt-8 xl:text-left">
				<Button variant="primary" class="w-full px-4 py-3 align-top xl:w-32 xl:mr-3" type="submit">
					{#if !signInButtonLoading}
						Iniciar sesión
					{:else}
						<LoadingIcon icon="oval" color="white" class="w-4 h-4 ml-2" />
					{/if}
				</Button>
				<Button
					as="a"
					href="/register"
					variant="outline-secondary"
					class="w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0"
				>
					Registrarse
				</Button>
			</div>
		</form>
		<div class="mt-10 text-center intro-x xl:mt-24 text-slate-600 dark:text-slate-500 xl:text-left">
			Al registrarte, aceptas nuestros
			<a class="text-primary dark:text-slate-200" href="#top"> terminos y condiciones </a>
			&
			<a class="text-primary dark:text-slate-200" href="#top"> politicas de privacidad </a>
		</div>
	</div>
</div>
