import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const session = locals.username;
	if (session) {
		throw redirect(307, '/home');
	}

	return {};
}) satisfies LayoutServerLoad;
