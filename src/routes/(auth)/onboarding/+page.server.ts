import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const ssr = false;

export const load = (async ({ locals }) => {
	const showOnboarding = locals.user?.flags?.shouldSeeOnboarding || false;
	if (!showOnboarding) {
		throw redirect(308, '/home');
	}

	return {};
}) satisfies PageServerLoad;
