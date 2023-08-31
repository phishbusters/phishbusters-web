import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	// const session = locals.jwt;
	// if (!session) {
	// 	throw redirect(302, '/login');
	// }

	return {
		showNavbar: !locals.user.flags?.shouldSeeOnboarding || false
	};
}) satisfies LayoutServerLoad;
