import type { PageServerLoad } from './$types';

export const ssr = false;

export const load = (async ({ locals }) => {
	return {
		companyName: locals.user?.company?.companyName || ''
	};
}) satisfies PageServerLoad;
