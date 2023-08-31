<script lang="ts">
	import { LucideIcons, BoxContainer, formComponents } from '$lib/components';
	const { FormInput, FormLabel } = formComponents;

	import type { PageData } from './$types';

	// export let data: PageData;

	const socialNetworks = [
		{
			name: 'Twitter',
			id: 'twitter'
		},
		{ name: 'Instagram', id: 'instagram' },
		{ name: 'Facebook', id: 'facebook' },
		{ name: 'Linkedin', id: 'linkedin' }
	];
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
						<span class="text-sm ml-3"> Información institucional </span>
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
						<LucideIcons icon="MessageCircle" />
						<span class="text-sm ml-3">Whatsapp</span>
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-1 flex-col ml-6">
			<BoxContainer title="Información institucional">
				<div class="w-full">
					<FormLabel htmlFor="companyName">Nombre de la empresa</FormLabel>
					<FormInput class="w-full" id="companyName" type="text" placeholder="Phishbusters" />
				</div>
				<div class="w-full">
					<FormLabel htmlFor="companyName">Sitio web institucional</FormLabel>
					<FormInput
						class="w-full"
						id="companyName"
						type="text"
						placeholder="http://www.pbusters.com"
					/>
				</div>
			</BoxContainer>
			<BoxContainer title="Redes sociales">
				<div class="flex items-center justify-evenly flex-1 gap-3 pb-3">
					{#each socialNetworks as sNetwork}
						<div class="w-full">
							<FormLabel htmlFor={sNetwork.id}>{sNetwork.name}</FormLabel>
							<FormInput class="w-full" id={sNetwork.id} type="text" placeholder="Phishbusters" />
						</div>
					{/each}
				</div>
			</BoxContainer>
		</div>
	</div>
</div>
