import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const { user } = locals;
	const showOnboarding = user?.flags?.shouldSeeOnboarding || false;
	return {
		showOnboarding
	};
}) satisfies PageServerLoad;
