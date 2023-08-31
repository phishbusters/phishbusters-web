import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const showOnboarding = locals.user.flags.shouldSeeOnboarding;
	return {
		showOnboarding
	};
}) satisfies PageServerLoad;
