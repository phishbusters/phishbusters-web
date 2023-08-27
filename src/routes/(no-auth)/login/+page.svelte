<script lang="ts">
	import illustrationUrl from '../assets/images/illustration.svg';
	import { Input, CheckBox, Button } from '$lib/components';
	import clsx from 'clsx';
	import AppLogo from '$lib/components/app-logo/app-logo.svelte';
	import Link from '$lib/components/link/link.svelte';
</script>

<div>
	<div
		class={clsx([
			'-m-3 sm:-mx-8 p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600',
			"before:hidden before:xl:block before:content-[''] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400",
			"after:hidden after:xl:block after:content-[''] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700"
		])}
	>
		<div class="container relative z-10 sm:px-10">
			<div class="block grid-cols-2 gap-4 xl:grid">
				<div class="flex-col hidden min-h-screen xl:flex">
					<a href="#top" class="flex items-center pt-5 -intro-x">
						<AppLogo />
					</a>
					<div class="my-auto">
						<img
							alt="Midone Tailwind HTML Admin Template"
							class="w-1/2 -mt-16 -intro-x"
							src={illustrationUrl}
						/>
						<div class="mt-10 text-4xl font-medium leading-tight text-white -intro-x">
							A few more clicks to <br />
							sign in to your account.
						</div>
						<div class="mt-5 text-lg text-white -intro-x text-opacity-70 dark:text-slate-400">
							Unos pasos más para acceder a tu cuenta. Protege tus activos digitales con nuestro
							software de detección de phishing respaldado por modelos de Aprendizaje Automático.
						</div>
					</div>
				</div>
				<div class="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
					<div
						class="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto"
					>
						<h2 class="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
							Ingresá con tu cuenta
						</h2>
						<div class="mt-2 text-center intro-x text-slate-400 xl:hidden">
							Unos pasos más para acceder a tu cuenta. Protege tus activos digitales con nuestro
							software de detección de phishing respaldado por modelos de Aprendizaje Automático.
						</div>
						<div class="mt-8 intro-x">
							<Input
								type="text"
								class="block px-4 py-3 intro-x min-w-full xl:min-w-[350px]"
								placeholder="Email"
							/>
							<Input
								type="password"
								class="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
								placeholder="Password"
							/>
						</div>
						<div class="flex mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
							<div class="flex items-center mr-auto">
								<CheckBox
									labelClassName="cursor-pointer select-none"
									id="remember-me"
									type="checkbox"
									class="mr-2 border"
								>
									Remember me
								</CheckBox>
							</div>
							<Link label="Olvidaste tu contraseña?" href="#top" />
						</div>
						<div class="mt-5 text-center intro-x xl:mt-8 xl:text-left">
							<Button variant="primary" class="w-full px-4 py-3 align-top xl:w-32 xl:mr-3">
								Iniciar sesión
							</Button>
							<Button
								variant="outline-secondary"
								class="w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0"
							>
								Registrar nueva cuenta
							</Button>
						</div>
						<div
							class="mt-10 text-center intro-x xl:mt-24 text-slate-600 dark:text-slate-500 xl:text-left"
						>
							Al registrarte, aceptas nuestros
							<a class="text-primary dark:text-slate-200" href="#top"> terminos y condiciones </a>
							&
							<a class="text-primary dark:text-slate-200" href="#top"> politicas de privacidad </a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
