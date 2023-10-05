import { apiEndpoints } from '$lib/api';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const ssr = false;

export const load = (async ({ locals }) => {
	const { user, jwt } = locals;
	if (!jwt) {
		throw redirect(308, '/login');
	}

	const showOnboarding = user?.flags?.shouldSeeOnboarding || false;
	const phishingStats = (await apiEndpoints.phishingStats.get(jwt)).data;

	return {
		showOnboarding,
		stats: phishingStats || {
			sinceCreation: {
				totalPhishingChats: 0,
				totalFakeProfiles: 0,
				totalComplaints: 0,
				successFullComplaints: 0
			},
			lastSevenDays: []
		}
	};
}) satisfies PageServerLoad;
