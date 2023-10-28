<script lang="ts">
	import { Table } from '$lib/components';
	import dayjs from 'dayjs';
	import type { PageData } from './$types';

	export let data: PageData;

	function parseDate(date: Date) {
		return dayjs('2023-10-25T15:54:37.579Z').format('DD/MM/YYYY - HH:mm');
	}
</script>

<div class="p-4">
	<h1 class="text-2xl font-semibold mb-4">Take Down de Perfiles</h1>
	<div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y box p-8">
		<p class="mb-4">
			En esta página se muestran los estados de los perfiles que están en proceso de ser dados de
			baja. Los estados son los siguientes:
		</p>
		<ul class="list-disc list-inside mb-4">
			<li><strong>Creado:</strong> Denuncia creada y en espera de ejecución.</li>
			<li><strong>Abierto:</strong> Denuncia enviada, esperando respuesta de Twitter.</li>
			<li><strong>Cerrado:</strong> Denuncia completada con satisfacción.</li>
		</ul>

		<div class="overflow-x-auto">
			{#if data.complaints.length > 0}
				<Table hover class="mt-5">
					<Table.Thead variant="light">
						<Table.Tr>
							<Table.Th class="whitespace-nowrap">#</Table.Th>
							<Table.Th class="whitespace-nowrap">ID del Perfil o Nombre</Table.Th>
							<Table.Th class="whitespace-nowrap">Red Social</Table.Th>
							<Table.Th class="whitespace-nowrap">Estado del Take Down</Table.Th>
							<Table.Th class="whitespace-nowrap">Fecha de creación</Table.Th>
							<Table.Th class="whitespace-nowrap">Ultima actualización</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{#each data.complaints as complain, index}
							<Table.Tr>
								<Table.Td>{index + 1}</Table.Td>
								<Table.Td>{complain.profileId}</Table.Td>
								<Table.Td>Twitter</Table.Td>
								<Table.Td>{complain.status}</Table.Td>
								<Table.Td>{parseDate(complain.createdAt)}</Table.Td>
								<Table.Td>{parseDate(complain.updatedAt)}</Table.Td>
							</Table.Tr>
						{/each}
					</Table.Tbody>
				</Table>
			{:else}
				<div class="mt-5 text-center text-gray-500">
					<p>No hay datos para mostrar.</p>
				</div>
			{/if}
		</div>
	</div>
</div>
