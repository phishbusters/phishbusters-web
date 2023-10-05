<script lang="ts">
	import { onMount } from 'svelte';
	import Swal from 'sweetalert2';
	import { goto } from '$app/navigation';
	import { stepper as onboardingState, type StepData } from '$lib/stores/onboarding';
	import {
		LucideIcons,
		BoxContainer,
		formComponents,
		fileUpload,
		Button,
		LoadingIcon,
		ErrorLabel
	} from '$lib/components';
	import { validateCurrentStepData } from './validation';
	import { socialNetworks } from './constants';
	const { Preview, PreviewPanel, DropZone } = fileUpload;
	const { FormInput, FormLabel } = formComponents;

	let dropZoneR: fileUpload.DropzoneElement;
	onMount(() => {
		const dropZoneRef = dropZoneR;
		if (dropZoneRef) {
			const dropzone = dropZoneRef.dropzone;
			dropzone.on('success', () => {
				// alert('Added file.');
			});
			dropzone.on('error', () => {
				// alert('No more files please!');
			});

			dropzone.on('addedfile', async (file) => {
				const formData = new FormData();
				formData.append('file', file);
				const response = await fetch('/api/onboarding/images', {
					method: 'POST',
					body: formData
				});

				if (response.ok) {
					// const data = await response.json();
					dropzone.emit('success', file);
				} else {
					dropzone.emit('error', file, 'Ha ocurrido un error al subir el archivo.');
					dropzone.emit('complete', file);
				}
			});
		}

		const savedState = localStorage.getItem('onboarding');
		if (savedState) {
			// onboardingState.set(JSON.parse(savedState));
		}

		onboardingState.subscribe((value) => {
			// localStorage.setItem('onboarding', JSON.stringify(value));
		});
	});

	let submitForm = false;
	let onboardingData: StepData;
	onboardingState.subscribe((value) => {
		onboardingData = value;
	});

	function handleAddPhone() {
		const { phones } = onboardingData.data;
		if (phones.length >= 4) {
			return;
		}

		onboardingState.addPhone();
	}

	function handleAddEmails() {
		const { emails } = onboardingData.data;
		if (emails.length >= 4) {
			return;
		}

		onboardingState.addEmail();
	}

	function previousStep() {
		onboardingState.prevStep();
	}

	async function handleNextStep() {
		const { step: currentStep, data: currentData } = onboardingData;
		if (currentStep === 4) {
			return callApi(currentData);
		} else {
			// Validar y guardar los datos del paso actual
			onboardingState.cleanErrors();
			const hasErrors = validateCurrentStepData(currentStep, currentData);
			if (!hasErrors) {
				onboardingState.nextStep(currentData);
			} else {
				Object.keys(hasErrors).forEach((key) => {
					onboardingState.setError(key as any, hasErrors[key]);
				});
			}
		}
	}

	async function callApi(data: StepData['data']) {
		submitForm = true;
		try {
			const response = await fetch('/api/onboarding', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			submitForm = false;
			if (response.ok) {
				const data = await response.json();
				if (data.error) {
					// Error en la API
					return;
				}

				Swal.fire({
					title: '¡Listo!',
					text: 'Tu información ha sido guardada correctamente.',
					icon: 'success',
					confirmButtonText: 'Ir al dashboard'
				}).then((result) => {
					if (result.isConfirmed) {
						goToDashboard();
					}
				});
			} else {
				// Error en datos
			}
		} catch (err) {
			console.log(err);
		}
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
						<div class="flex flex-1 justify-end">
							{#if onboardingData.step === 0}
								<LucideIcons icon="ArrowLeft" />
							{:else}
								<LucideIcons class="stroke-green-600" icon="CheckCircle2" />
							{/if}
						</div>
					</div>
					<div class="flex items-center mb-4">
						<LucideIcons icon="Network" />
						<span class="text-sm ml-3">Redes sociales</span>
						<div class="flex flex-1 justify-end">
							{#if onboardingData.step === 1}
								<LucideIcons icon="ArrowLeft" />
							{:else if onboardingData.step > 1}
								<LucideIcons class="stroke-green-600" icon="CheckCircle2" />
							{:else}
								<LucideIcons icon="Circle" />
							{/if}
						</div>
					</div>
					<div class="flex items-center mb-4">
						<LucideIcons icon="Mail" />
						<span class="text-sm ml-3">Telefonos</span>
						<div class="flex flex-1 justify-end">
							{#if onboardingData.step === 2}
								<LucideIcons icon="ArrowLeft" />
							{:else if onboardingData.step > 2}
								<LucideIcons class="stroke-green-600" icon="CheckCircle2" />
							{:else}
								<LucideIcons icon="Circle" />
							{/if}
						</div>
					</div>
					<div class="flex items-center mb-4">
						<LucideIcons icon="Phone" />
						<span class="text-sm ml-3">Correos</span>
						<div class="flex flex-1 justify-end">
							{#if onboardingData.step === 3}
								<LucideIcons icon="ArrowLeft" />
							{:else if onboardingData.step > 3}
								<LucideIcons class="stroke-green-600" icon="CheckCircle2" />
							{:else}
								<LucideIcons icon="Circle" />
							{/if}
						</div>
					</div>
					<div class="flex items-center mb-4">
						<LucideIcons icon="PictureInPicture" />
						<span class="text-sm ml-3">Imagenes</span>
						<div class="flex flex-1 justify-end">
							{#if onboardingData.step === 4}
								<LucideIcons icon="ArrowLeft" />
							{:else if onboardingData.step > 4}
								<LucideIcons class="stroke-green-600" icon="CheckCircle2" />
							{:else}
								<LucideIcons icon="Circle" />
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-1 flex-col ml-6">
			{#if $onboardingState.step === 0}
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
							bind:value={onboardingData.data.companyName}
							required
							class="w-full"
							id="companyName"
							type="text"
							placeholder="Phishbusters"
						/>
						{#if onboardingData.data.input?.companyName}
							<ErrorLabel message={onboardingData.data.input.companyName} />
						{/if}
					</div>
					<div class="w-full">
						<FormLabel htmlFor="companyWebSite"
							>Sitio web corporativo<span class="text-red-600">*</span></FormLabel
						>
						<FormInput
							name="companyWebSite"
							bind:value={onboardingData.data.companyWebSite}
							required
							class="w-full"
							id="companyWebSite"
							type="text"
							placeholder="http://www.pbusters.com"
						/>
						{#if onboardingData.data.input?.companyWebSite}
							<ErrorLabel message={onboardingData.data.input?.companyWebSite} />
						{/if}
					</div>
				</BoxContainer>
			{/if}

			{#if $onboardingState.step === 1}
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
									bind:value={onboardingData.data.socialNetworks[sNetwork.id]}
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
			{/if}

			{#if $onboardingState.step === 2}
				<BoxContainer title="Teléfonos empresariales">
					<div class="w-full self-start">
						<span class="text-xs leading-relaxed text-slate-500 block">
							Números de teléfono utilizados para la comunicación con clientes y socios comerciales.
							La protección de los números de teléfono es importante para evitar intentos de
							ingeniería social y estafas telefónicas.
						</span>
					</div>
					<div
						class={`grid flex-1 grid-cols-2 grid-flow-col ${
							$onboardingState.data.phones.length > 2 ? 'grid-rows-2' : ''
						} grid-col-2 gap-4`}
					>
						{#each $onboardingState.data.phones as _, index}
							<div class="w-full">
								<FormLabel htmlFor={`phone${index}`}>Telefóno</FormLabel>
								<FormInput
									bind:value={onboardingData.data.phones[index]}
									class="w-full"
									name={`phone${index}`}
									id={`phone${index}`}
									type="text"
									placeholder="Telefono"
								/>
							</div>
						{/each}
					</div>
					<div class="w-full">
						<Button variant="outline-success" type="button" on:click={handleAddPhone}
							>Agregar telefóno</Button
						>
					</div>
				</BoxContainer>
			{/if}

			{#if $onboardingState.step === 3}
				<BoxContainer title="Correos empresariales">
					<div class="w-full self-start">
						<span class="text-xs leading-relaxed text-slate-500 block">
							Direcciones de correo electrónico utilizadas para soporte técnico y contacto con
							clientes. <br />Proteger estos correos es esencial para prevenir ataques de phishing
							que podrían comprometer la comunicación y la seguridad de la información
						</span>
					</div>
					<div
						class={`grid flex-1 grid-cols-2 grid-flow-col ${
							$onboardingState.data.emails.length > 2 ? 'grid-rows-2' : ''
						} grid-col-2 gap-4`}
					>
						{#each $onboardingState.data.emails as _, index}
							<div class="w-full">
								<FormLabel htmlFor="email1">Email</FormLabel>
								<FormInput
									bind:value={onboardingData.data.emails[index]}
									class="w-full"
									name={`email${index}`}
									id={`email${index}`}
									type="email"
									placeholder="Email"
								/>
							</div>
						{/each}
					</div>
					<div class="w-full">
						<Button variant="outline-success" type="button" on:click={handleAddEmails}
							>Agregar email</Button
						>
					</div>
				</BoxContainer>
			{/if}

			{#if $onboardingState.step === 4}
				<BoxContainer title="Imagenes institucionales">
					<div class="w-full self-start">
						<span class="text-xs leading-relaxed text-slate-500 block">
							Recursos visuales que representan la imagen de la empresa, como logotipos y fotos
							corporativas. La protección de estas imágenes es crucial para evitar su uso indebido
							en campañas de phishing y actividades fraudulentas. Es importante tener en cuenta que
							el tamaño máximo permitido para cada archivo es de 5 MB. Este límite asegura una
							gestión eficiente de los recursos y mantiene la integridad del sistema.
						</span>
					</div>
					<Preview class="full-w flex-1">
						<PreviewPanel>
							<DropZone
								bind:ref={dropZoneR}
								options={{
									url: '/api/onboarding/images',
									acceptedFiles: 'image/*',
									thumbnailWidth: 250,
									maxFilesize: 5
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
			{/if}

			<div class="p-4 self-end flex justify-end">
				{#if onboardingData.data.message}
					<ErrorLabel message={onboardingData.data.message} />
				{/if}
				{#if $onboardingState.step > 0}
					<Button class="mr-4" type="button" on:click={previousStep} variant="outline-dark"
						>Anterior</Button
					>
				{/if}
				<Button type="button" on:click={handleNextStep} variant="primary">
					{#if $onboardingState.step === 4}
						{#if !submitForm}
							Enviar
						{:else}
							<LoadingIcon icon="oval" color="white" class="w-4 h-4 ml-2" />
						{/if}
					{:else}
						Siguiente
					{/if}
				</Button>
			</div>
		</div>
	</div>
</div>
