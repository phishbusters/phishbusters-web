import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const session = locals.username;
	if (!session) {
		throw error(401, 'Lo que estas buscando no existe.');
	}

	return {};
}) satisfies LayoutServerLoad;
