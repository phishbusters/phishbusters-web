import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const showOnboarding = locals.user.flags.shouldSeeOnboarding;
	if (!showOnboarding) {
		throw redirect(302, '/');
	}

	return {};
}) satisfies PageServerLoad;
