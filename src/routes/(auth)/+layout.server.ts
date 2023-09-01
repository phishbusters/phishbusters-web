import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const { jwt, user } = locals;
	if (!jwt) {
		throw redirect(303, '/login');
	}

	return {
		showNavbar: !user?.flags?.shouldSeeOnboarding || false
	};
}) satisfies LayoutServerLoad;
