import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const { jwt } = locals;
	if (jwt) {
		throw redirect(303, '/');
	}

	return {};
}) satisfies LayoutServerLoad;
