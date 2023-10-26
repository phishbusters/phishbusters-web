<script lang="ts">
	import { onMount } from 'svelte';
	import PdfViewer from 'svelte-pdf';
	import SignaturePad from 'signature_pad';
	import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
	import { goto } from '$app/navigation';
	import { formComponents, ErrorLabel, Button, LoadingIcon } from '$lib/components';
	const { FormInput, FormLabel } = formComponents;
	import { documentStore, type DocumentStore } from '$lib/stores/documents';
	import { isEmpty, isValidEmail } from '$lib/utils/validators';
	import pdfContent from './pdf.json';
	import { formatDate } from '$lib/utils/utils';
	import type { PageData } from './$types';
	import Swal from 'sweetalert2';

	export let data: PageData;
	let documentsData: DocumentStore;
	documentStore.subscribe((value) => {
		documentsData = value;
	});
	let signaturePad: SignaturePad;
	let base64 = '';
	let pdfByteArray: Uint8Array;
	let forceReactivityPDF = true;
	let isLoading = false;
	let isSaveDisabled = true;

	const isValidForm = () => {
		const { legalName, legalTitle, renewalDate, address, phone, email } = $documentStore;
		if (
			isEmpty(legalName) ||
			isEmpty(legalTitle) ||
			isEmpty(renewalDate) ||
			isEmpty(address) ||
			isEmpty(phone) ||
			isEmpty(email) ||
			signaturePad?.isEmpty()
		) {
			return false;
		}

		return true;
	};

	const saveData = () => {
		if (isValidForm() && isValidEmail($documentStore.email)) {
			isLoading = true;
			const requestData = {
				address: documentsData.address,
				phone: documentsData.phone,
				email: documentsData.email,
				renewalDate: documentsData.renewalDate,
				legalName: documentsData.legalName,
				legalTitle: documentsData.legalTitle,
				signatureDataURL: signaturePad?.toDataURL()
			};

			fetch('/api/validate-user-sign', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestData)
			})
				.then(() => {
					isLoading = false;
					Swal.fire({
						title: '¡Listo!',
						text: 'Hemos guardado tus datos correctamente.',
						icon: 'success',
						confirmButtonText: 'Ir al dashboard'
					}).then((result) => {
						if (result.isConfirmed) {
							goto('/home');
						}
					});
				})
				.catch((err) => console.log(err));
			return;
		}
	};

	function clearSign() {
		signaturePad?.clear();
	}

	function validateField(field: keyof DocumentStore['errors'], value: string) {
		if (!value) {
			documentStore.setError(field, 'Este campo es obligatorio');
		} else {
			documentStore.setError(field, ''); // o podrías llamar a una función que elimine este error específico
		}
	}

	function validateRenewalDate(value: string) {
		const today = new Date();
		const renewalDate = new Date(value);

		if (renewalDate <= today) {
			documentStore.setError('renewalDate', 'La fecha de renovación debe ser en el futuro');
		} else {
			documentStore.setError('renewalDate', '');
		}
	}

	async function updatePDF() {
		const { address, phone, email, legalName, legalTitle, renewalDate } = $documentStore;
		const pdfDoc = await PDFDocument.create();
		const titleFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
		const bodyFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
		const page = pdfDoc.addPage([600, 800]);
		page.setFont(bodyFont);
		page.setFontSize(18);
		page.setFontColor(rgb(0, 0, 0));
		page.drawText(pdfContent.header, {
			x: 50,
			y: 750,
			font: titleFont,
			size: 18,
			color: rgb(0, 0, 0)
		});

		const signatureDataUrl = signaturePad?.toDataURL();
		const signatureBytes = Uint8Array.from(atob(signatureDataUrl.split(',')[1]), (c) =>
			c.charCodeAt(0)
		);
		const signatureImage = await pdfDoc.embedPng(signatureBytes);
		const { width, height } = signatureImage.scale(0.5);

		page.drawImage(signatureImage, {
			x: 50,
			y: 310,
			width,
			height
		});

		page.setFontSize(12);
		const today = formatDate(new Date(), 'DD/MM/YYYY');
		const bodyText = pdfContent.body
			.map((line) =>
				line
					.replace('{companyName}', data.companyName)
					.replace('{address}', address)
					.replace('{phone}', phone)
					.replace('{email}', email)
					.replace('{today}', today)
					.replace('{renewalDate}', renewalDate)
					.replace('{legalName}', legalName)
					.replace('{legalTitle}', legalTitle)
			)
			.join('\n');

		page.drawText(bodyText, {
			x: 50,
			y: 700,
			font: bodyFont,
			size: 12,
			maxWidth: 500,
			color: rgb(0, 0, 0),
			lineHeight: 18
		});

		const pdfBytes = await pdfDoc.save();
		// base64 = Buffer.from(pdfBytes).toString('base64');
		base64 = btoa(String.fromCharCode.apply(null, Array.from(pdfBytes)));
		pdfByteArray = pdfBytes;
		forceReactivityPDF = true;
	}

	$: {
		forceReactivityPDF = false;
		isSaveDisabled = !isValidForm();
		$documentStore; // Esto asegura que el bloque de código se reevalúe cuando la tienda cambie
		updatePDF();
	}

	onMount(() => {
		const canvas = document.querySelector('canvas');
		if (!canvas) {
			return;
		}

		signaturePad = new SignaturePad(canvas, {
			backgroundColor: 'rgb(255, 255, 255)',
			maxWidth: 5
		});
	});
</script>

<div class="flex flex-col flex-1 justify-start p-4">
	<h1 class="text-2xl font-semibold mb-4">Información sobre la Carta de Representación</h1>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<!-- Nombre del Representante Legal -->
		<div class="mb-4">
			<FormLabel htmlFor="legalName"
				>Nombre del Representante Legal <span class="text-red-600">*</span></FormLabel
			>
			<FormInput
				name="legalName"
				bind:value={documentsData.legalName}
				on:blur={() => validateField('legalName', documentsData.legalName)}
				required
				class="w-full"
				id="legalName"
				type="text"
				placeholder="Juan Pérez"
			/>
			{#if documentsData.errors?.legalName}
				<ErrorLabel message={documentsData.errors.legalName} />
			{/if}
		</div>

		<!-- Título del Representante Legal -->
		<div class="mb-4">
			<FormLabel htmlFor="legalTitle"
				>Cargo del Representante Legal <span class="text-red-600">*</span></FormLabel
			>
			<FormInput
				name="legalTitle"
				bind:value={documentsData.legalTitle}
				on:blur={() => validateField('legalTitle', documentsData.legalTitle)}
				required
				class="w-full"
				id="legalTitle"
				type="text"
				placeholder="Director General"
			/>

			{#if documentsData.errors?.legalTitle}
				<ErrorLabel message={documentsData.errors.legalTitle} />
			{/if}
		</div>

		<!-- Firma Digital -->
		<div class="mb-4 col-span-2 flex flex-col items-start">
			<FormLabel htmlFor="digitalSignature">Firma Digital</FormLabel>
			<div class="flex flex-row">
				<canvas id="signature-pad" />
				<Button on:click={clearSign} variant="soft-secondary" class="ml-6 h-10 self-center"
					>Limpiar firma</Button
				>
			</div>
		</div>

		<!-- Fecha de Renovación -->
		<div class="mb-4">
			<FormLabel htmlFor="renewalDate"
				>Fecha de Renovación <span class="text-red-600">*</span></FormLabel
			>
			<FormInput
				name="renewalDate"
				bind:value={documentsData.renewalDate}
				on:blur={() => validateRenewalDate(documentsData.renewalDate)}
				required
				class="w-full"
				id="renewalDate"
				type="date"
			/>
			{#if documentsData.errors?.renewalDate}
				<ErrorLabel message={documentsData.errors.renewalDate} />
			{/if}
		</div>

		<!-- Dirección -->
		<div class="mb-4">
			<FormLabel htmlFor="address"
				>Dirección de la Empresa <span class="text-red-600">*</span></FormLabel
			>
			<FormInput
				name="address"
				bind:value={documentsData.address}
				on:blur={() => validateField('address', documentsData.address)}
				required
				class="w-full"
				id="address"
				type="text"
				placeholder="Av. Corrientes 1234, CABA"
			/>
			{#if documentsData.errors?.address}
				<ErrorLabel message={documentsData.errors.address} />
			{/if}
		</div>

		<!-- Teléfono -->
		<div class="mb-4">
			<FormLabel htmlFor="phone">Teléfono de Contacto <span class="text-red-600">*</span></FormLabel
			>
			<FormInput
				name="phone"
				bind:value={documentsData.phone}
				on:blur={() => validateField('phone', documentsData.phone)}
				required
				class="w-full"
				id="phone"
				type="text"
				placeholder="+54 9 11 1234 5678"
			/>
			{#if documentsData.errors?.phone}
				<ErrorLabel message={documentsData.errors.phone} />
			{/if}
		</div>

		<!-- Correo Electrónico -->
		<div class="mb-4">
			<FormLabel htmlFor="email"
				>Correo Electrónico Corporativo <span class="text-red-600">*</span></FormLabel
			>
			<FormInput
				name="email"
				bind:value={documentsData.email}
				on:blur={() => validateField('email', documentsData.email)}
				required
				class="w-full"
				id="email"
				type="text"
				placeholder="seguridad@phishbusters.com"
			/>
			{#if documentsData.errors?.email}
				<ErrorLabel message={documentsData.errors.email} />
			{/if}
		</div>
	</div>

	<div class="mb-4">
		<div class="flex flex-1 justify-end">
			<Button disabled={isSaveDisabled} on:click={saveData} variant="primary">
				{#if isLoading}
					<LoadingIcon icon="oval" color="white" class="w-4 h-4 ml-2" />
				{:else}
					Guardar cambios
				{/if}
			</Button>
		</div>
	</div>

	<!-- Preview PDF -->
	{#if base64 && forceReactivityPDF}
		<div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
			<div class="text-center">
				<FormLabel htmlFor="">Vista Previa del Documento</FormLabel>
				<svelte:component this={PdfViewer} url={base64} data={pdfByteArray} showButtons={[]} />
			</div>
		</div>
	{/if}
</div>
