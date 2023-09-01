<script lang="ts">
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import type { ActionData } from './$types';
	import {
		LucideIcons,
		BoxContainer,
		formComponents,
		fileUpload,
		Button,
		LoadingIcon,
		ErrorLabel
	} from '$lib/components';
	import Swal from 'sweetalert2';
	const { Preview, PreviewPanel, DropZone } = fileUpload;
	const { FormInput, FormLabel } = formComponents;

	export let form: ActionData;
	let dropzoneMultipleRef: fileUpload.DropzoneElement;
	onMount(() => {
		const elDropzoneMultipleRef = dropzoneMultipleRef;
		if (elDropzoneMultipleRef) {
			elDropzoneMultipleRef.dropzone.on('success', () => {
				alert('Added file.');
			});
			elDropzoneMultipleRef.dropzone.on('error', () => {
				alert('No more files please!');
			});
		}
	});
	const socialNetworks = [
		{
			name: 'Twitter',
			id: 'twitter',
			placeholder: 'https://twitter.com/PhishBusters'
		},
		{ name: 'Instagram', id: 'instagram', placeholder: 'https://instagram.com/PhishBusters' },
		{ name: 'Facebook', id: 'facebook', placeholder: 'https://facebook.com/PhishBusters' },
		{ name: 'Linkedin', id: 'linkedin', placeholder: 'https://linkedin.com/PhishBusters' }
	];

	const test = [0, 1, 2, 3];

	let submitForm = false;
	function onEnhanceSubmit() {
		submitForm = true;

		return async ({ update, result }: { update: () => Promise<void>; result: any }) => {
			await update();
			submitForm = false;
			if (result.type === 'success') {
				Swal.fire({
					title: 'Registro finalizado',
					text: 'Serás redirigido a la pantalla de inicio de sesión.',
					icon: 'success',
					confirmButtonText: 'Aceptar'
				}).then(() => {
					goToDashboard();
				});
			}
		};
	}

	function goToDashboard() {
		goto('/');
	}
</script>

<div class="p-12">
	<div>
		<h2 class="text-xl font-medium">Configuración de activos digitales</h2>
	</div>
	<div class="flex flex-row items-start mt-4">
		<div>
			<div class="box flex flex-col flex-1">
				<div class="border-b-2 border-gray-100 p-2">
					<div class="flex justify-between items-center p-2">
						<div class="mr-3 text-lg font-medium truncate">Detalles de la cuenta</div>
						<div class="ml-3">
							<LucideIcons icon="Info" />
						</div>
					</div>
				</div>
				<div class="p-3">
					<div class="flex items-center mb-4 mt-2">
						<LucideIcons icon="HeartPulse" />
						<span class="text-sm ml-3">Información institucional</span>
					</div>
					<div class="flex items-center mb-4">
						<LucideIcons icon="Network" />
						<span class="text-sm ml-3">Redes sociales</span>
					</div>
					<div class="flex items-center mb-4">
						<LucideIcons icon="Mail" />
						<span class="text-sm ml-3">Correos</span>
					</div>
					<div class="flex items-center mb-4">
						<LucideIcons icon="Phone" />
						<span class="text-sm ml-3">Telefonos</span>
					</div>
					<div class="flex items-center mb-4">
						<LucideIcons icon="PictureInPicture" />
						<span class="text-sm ml-3">Imagenes</span>
					</div>
				</div>
			</div>
		</div>
		<form action="/onboarding" method="POST" use:enhance={onEnhanceSubmit}>
			<div class="flex flex-1 flex-col ml-6">
				<BoxContainer title="Información institucional">
					<div class="w-full self-start">
						<span class="text-xs leading-relaxed text-slate-500 block">
							Datos clave sobre la empresa, como su nombre y sitio web. <br /> Salvaguardar esta información
							es fundamental para evitar que los atacantes utilicen datos falsos en ataques de phishing
							dirigidos a empleados, clientes o socios.
						</span>
					</div>
					<div class="w-full">
						<FormLabel htmlFor="companyName"
							>Nombre de la empresa <span class="text-red-600">*</span></FormLabel
						>
						<FormInput
							name="companyName"
							required
							class="w-full"
							id="companyName"
							type="text"
							placeholder="Phishbusters"
						/>
						{#if form?.input?.companyName}
							<ErrorLabel message={form.input.companyName} />
						{/if}
					</div>
					<div class="w-full">
						<FormLabel htmlFor="companyWebSite"
							>Sitio web corporativo<span class="text-red-600">*</span></FormLabel
						>
						<FormInput
							name="companyWebSite"
							required
							class="w-full"
							id="companyWebSite"
							type="text"
							placeholder="http://www.pbusters.com"
						/>
						{#if form?.input?.companyWebSite}
							<ErrorLabel message={form.input.companyWebSite} />
						{/if}
					</div>
				</BoxContainer>
				<BoxContainer justify="justify-start" title="Redes sociales">
					<div class="w-full self-start">
						<span class="text-xs leading-relaxed text-slate-500 block">
							Perfiles en plataformas de redes sociales utilizados para interactuar con la audiencia
							y promover la marca. <br />Mantener seguras estas cuentas es esencial para prevenir el
							secuestro de cuentas y la difusión de información falsa
						</span>
					</div>
					<div class="grid flex-1 grid-cols-2 grid-flow-col grid-rows-2 grid-col-2 gap-4">
						{#each socialNetworks as sNetwork}
							<div class="w-full">
								<FormLabel htmlFor={sNetwork.id}>{sNetwork.name}</FormLabel>
								<FormInput
									name={sNetwork.id}
									class="w-full"
									id={sNetwork.id}
									type="text"
									placeholder={sNetwork.placeholder}
								/>
							</div>
						{/each}
					</div>
				</BoxContainer>
				<BoxContainer title="Teléfonos empresariales">
					<div class="w-full self-start">
						<span class="text-xs leading-relaxed text-slate-500 block">
							Números de teléfono utilizados para la comunicación con clientes y socios comerciales.
							La protección de los números de teléfono es importante para evitar intentos de
							ingeniería social y estafas telefónicas.
						</span>
					</div>
					<div class="grid flex-1 grid-cols-2 grid-flow-col grid-rows-2 grid-col-2 gap-4">
						{#each test as _, index}
							<div class="w-full">
								<FormLabel htmlFor={`phone${index}`}>Telefono {index + 1}</FormLabel>
								<FormInput
									class="w-full"
									name={`phone${index}`}
									id={`phone${index}`}
									type="text"
									placeholder="Telefono"
								/>
							</div>
						{/each}
					</div>
				</BoxContainer>
				<BoxContainer title="Correos empresariales">
					<div class="w-full self-start">
						<span class="text-xs leading-relaxed text-slate-500 block">
							Direcciones de correo electrónico utilizadas para soporte técnico y contacto con
							clientes. <br />Proteger estos correos es esencial para prevenir ataques de phishing
							que podrían comprometer la comunicación y la seguridad de la información
						</span>
					</div>
					<div class="w-full">
						<FormLabel htmlFor="email1">Email 1</FormLabel>
						<FormInput class="w-full" name="email1" id="email1" type="email" placeholder="Email" />
					</div>
					<div class="w-full">
						<FormLabel htmlFor="email-2">Email 2</FormLabel>
						<FormInput
							class="w-full"
							name="email-2"
							id="email-2"
							type="email"
							placeholder="Email"
						/>
					</div>
				</BoxContainer>
				<BoxContainer title="Imagenes institucionales">
					<div class="w-full self-start">
						<span class="text-xs leading-relaxed text-slate-500 block">
							Recursos visuales que representan la imagen de la empresa, como logotipos y fotos
							corporativas. <br /> La protección de estas imágenes es crucial para evitar su uso indebido
							en campañas de phishing y actividades fraudulentas.
						</span>
					</div>
					<Preview class="full-w flex-1">
						<PreviewPanel>
							<DropZone
								bind:ref={dropzoneMultipleRef}
								options={{
									url: 'https://httpbin.org/post',
									thumbnailWidth: 150,
									maxFilesize: 0.5,
									headers: { 'My-Awesome-Header': 'header value' }
								}}
								class="dropzone"
							>
								<div class="text-lg font-medium">
									Arrastra archivos aquí o haz clic para cargarlos.
								</div>
								<div class="text-gray-600">
									Al arrastrar múltiples archivos se cargarán automáticamente en nuestras bases de
									datos.
								</div>
							</DropZone>
						</PreviewPanel>
					</Preview>
				</BoxContainer>
				<div class="p-4 self-end">
					{#if form?.message}
						<ErrorLabel message={form.message} />
					{/if}
					<Button type="submit" variant="primary">
						{#if !submitForm}
							Guardar activos digitales
						{:else}
							<LoadingIcon icon="oval" color="white" class="w-4 h-4 ml-2" />
						{/if}
					</Button>
				</div>
			</div>
		</form>
	</div>
</div>
