<script lang="ts">
	import { page } from '$app/stores';
	import errorImage from '$lib/assets/images/error-image.svg';
	import { Button } from '$lib/components';
</script>

<div>
	<div class="py-2">
		<div class="container">
			<div
				class="flex flex-col items-center justify-center h-screen text-center error-page lg:flex-row lg:text-left"
			>
				<div class="-intro-x lg:mr-20">
					<img
						alt="Midone Tailwind HTML Admin Template"
						class="w-[450px] h-48 lg:h-auto"
						src={errorImage}
					/>
				</div>
				<div class="mt-10 text-white lg:mt-0">
					<div class="font-medium intro-x text-8xl">{$page.status}</div>
					<div class="mt-5 text-xl font-medium intro-x lg:text-3xl">Oops.</div>
					<div class="mt-3 text-lg intro-x">
						{$page.error?.message || 'Parece que ha ocurrido un error inesperado.'}
					</div>
					<Button
						as="a"
						class="px-4 py-3 mt-10 text-white border-white intro-x dark:border-darkmode-400 dark:text-slate-200"
						href="/"
					>
						Volver al inicio
					</Button>
				</div>
			</div>
		</div>
	</div>
</div>
