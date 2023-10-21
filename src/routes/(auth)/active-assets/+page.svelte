<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import Swal from 'sweetalert2';
	import {
		BoxContainer,
		formComponents,
		fileUpload,
		Button,
		LoadingIcon,
		ErrorLabel
	} from '$lib/components';
	const { Preview, PreviewPanel, DropZone } = fileUpload;
	const { FormInput, FormLabel } = formComponents;

	export let data: PageData;
	let digitalAssets = data.assets;
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
	});

	let submitForm = false;

	function addField(field: 'phones' | 'emails' | 'socialMedia') {
		return () => {
			const newField =
				field === 'socialMedia'
					? {
							profile: '',
							name: '',
							id: ''
					  }
					: {
							value: '',
							id: ''
					  };
			digitalAssets[field].push(newField as any);
		};
	}

	async function handleSave() {
		if (JSON.stringify(digitalAssets) === JSON.stringify(data.assets)) {
			return null;
		}

		return callApi({});
	}

	async function callApi(data: any) {
		submitForm = true;
		try {
			const response = await fetch('/api/assets', {
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
						// goToDashboard();
					}
				});
			} else {
				// Error en datos
			}
		} catch (err) {
			console.log(err);
		}
	}
</script>

<div class="p-12">
	<div>
		<h2 class="text-xl font-medium">Mis activos digitales</h2>
	</div>
	<div class="flex flex-row items-start mt-4">
		<div class="flex flex-1 flex-col">
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
						bind:value={digitalAssets.companyData.companyName}
						required
						class="w-full"
						id="companyName"
						type="text"
						placeholder="Phishbusters"
					/>
					<!-- {#if digitalAssets.input?.companyName}
						<ErrorLabel message={digitalAssets.input.companyName} />
					{/if} -->
				</div>
				<div class="w-full">
					<FormLabel htmlFor="companyWebSite"
						>Sitio web corporativo<span class="text-red-600">*</span></FormLabel
					>
					<FormInput
						name="companyWebSite"
						bind:value={digitalAssets.companyData.webSite}
						required
						class="w-full"
						id="companyWebSite"
						type="text"
						placeholder="http://www.pbusters.com"
					/>
					<!-- {#if digitalAssets.input?.companyWebSite}
						<ErrorLabel message={digitalAssets.input?.companyWebSite} />
					{/if} -->
				</div>
			</BoxContainer>

			<BoxContainer justify="justify-start" title="Redes sociales">
				<div class="w-full self-start">
					<span class="text-xs leading-relaxed text-slate-500 block">
						Perfiles en plataformas de redes sociales utilizados para interactuar con la audiencia y
						promover la marca. <br />Mantener seguras estas cuentas es esencial para prevenir el
						secuestro de cuentas y la difusión de información falsa
					</span>
				</div>
				<div class="grid flex-1 grid-cols-2 grid-flow-col grid-rows-2 grid-col-2 gap-4">
					{#each digitalAssets.socialMedia as sNetwork}
						<div class="w-full">
							<FormLabel htmlFor={sNetwork.id}
								>{sNetwork.name.charAt(0).toUpperCase() + sNetwork.name.slice(1)}</FormLabel
							>
							<FormInput
								bind:value={sNetwork.profile}
								name={sNetwork.id}
								class="w-full"
								id={sNetwork.id}
								type="text"
								placeholder={sNetwork.profile}
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
				<div
					class={`grid flex-1 grid-cols-2 grid-flow-col ${
						digitalAssets.phones.length > 2 ? 'grid-rows-2' : ''
					} grid-col-2 gap-4`}
				>
					{#each digitalAssets.phones as _, index}
						<div class="w-full">
							<FormLabel htmlFor={`phone${index}`}>Telefóno</FormLabel>
							<FormInput
								bind:value={digitalAssets.phones[index].value}
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
					<Button variant="outline-success" type="button" on:click={addField('phones')}
						>Agregar telefóno</Button
					>
				</div>
			</BoxContainer>

			<BoxContainer title="Correos empresariales">
				<div class="w-full self-start">
					<span class="text-xs leading-relaxed text-slate-500 block">
						Direcciones de correo electrónico utilizadas para soporte técnico y contacto con
						clientes. <br />Proteger estos correos es esencial para prevenir ataques de phishing que
						podrían comprometer la comunicación y la seguridad de la información
					</span>
				</div>
				<div
					class={`grid flex-1 grid-cols-2 grid-flow-col ${
						digitalAssets.emails.length > 2 ? 'grid-rows-2' : ''
					} grid-col-2 gap-4`}
				>
					{#each digitalAssets.phones as _, index}
						<div class="w-full">
							<FormLabel htmlFor="email1">Email</FormLabel>
							<FormInput
								bind:value={digitalAssets.emails[index].value}
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
					<Button variant="outline-success" type="button" on:click={addField('emails')}
						>Agregar email</Button
					>
				</div>
			</BoxContainer>

			<BoxContainer title="Imagenes institucionales">
				<div class="w-full self-start">
					<span class="text-xs leading-relaxed text-slate-500 block">
						Recursos visuales que representan la imagen de la empresa, como logotipos y fotos
						corporativas. La protección de estas imágenes es crucial para evitar su uso indebido en
						campañas de phishing y actividades fraudulentas. Es importante tener en cuenta que el
						tamaño máximo permitido para cada archivo es de 5 MB. Este límite asegura una gestión
						eficiente de los recursos y mantiene la integridad del sistema.
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

			<div class="p-4 self-end flex justify-end">
				<!-- {#if digitalAssets.message}
					<ErrorLabel message={digitalAssets.message} />
				{/if} -->
				<Button type="button" on:click={handleSave} variant="primary">
					{#if !submitForm}
						Guardar cambios
					{:else}
						<LoadingIcon icon="oval" color="white" class="w-4 h-4 ml-2" />
					{/if}
				</Button>
			</div>
		</div>
	</div>
</div>
