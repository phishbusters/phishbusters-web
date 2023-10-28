import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { apiEndpoints } from '$lib/api';

export const ssr = false;

export const load = (async ({ locals }) => {
	const { jwt } = locals;
	if (!jwt) {
		throw error(401, 'Parece que la pagina que intenta ver no es accesible.');
	}

	const complaints = (await apiEndpoints.complaints.get(jwt)).data;
	console.log(complaints);
	return {
		complaints:
			complaints?.complaints.map((complaint) => {
				return {
					...complaint,
					status: mapStatus(complaint.status)
				};
			}) || []
	};
}) satisfies PageServerLoad;

const mapStatus = (status: string) => {
	if (status === 'Open') return 'Abierto';
	if (status === 'Created') return 'Creado';
	return 'Cerrado';
};
