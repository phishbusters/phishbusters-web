import { apiEndpoints } from '$lib/api';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const ssr = false;

export const load = (async ({ locals }) => {
	const { user, jwt } = locals;
	if (!jwt) {
		throw redirect(307, '/login');
	}

	const showOnboarding = user?.flags?.shouldSeeOnboarding || false;
	const showSignAlert = user?.company?.authorizationStatus === 'pending';
	const phishingStats = (await apiEndpoints.phishingStats.get(jwt)).data;
	phishingStats?.lastSevenDays.map((day) => {
		// We need a variable for the graph on the view to know how many are not executed
		// Either created or in progress
		day.complaintsNotExecuted = day.complaintsCreated + day.complaintsInProgress;
	});

	return {
		showOnboarding,
		showSignAlert,
		stats: phishingStats || {
			sinceCreation: {
				totalPhishingChats: 0,
				totalFakeProfiles: 0,
				totalComplaints: 0,
				successFullComplaints: 0
			},
			lastSevenDays: [],
			detectionAmount: {
				detectedBySystem: 0,
				detectedByUser: 0
			},
			falsePositiveAndInteractions: {
				falsePositiveCount: 0,
				positivesCount: 0,
				interactionRateForFalsePositive: 0,
				interactionRateForPositives: 0,
				interactionRates: []
			}
		}
	};
}) satisfies PageServerLoad;
