import { apiEndpoints } from '$lib/api';
import type { User } from '$lib/api/types';
import { jwtCookie } from '$lib/server/cookie-manager';
import type { Handle } from '@sveltejs/kit';

const getUserSessionData = async (jwt?: string): Promise<User | null> => {
	if (!jwt) {
		return null;
	}

	const callMe = await apiEndpoints.user.me(jwt);
	return callMe.data || null;
};

export const handle = (async ({ event, resolve }) => {
	try {
		const { cookies, locals } = event;
		const jwt = cookies.get(jwtCookie);
		const userData = await getUserSessionData(jwt);
		if (userData) {
			locals.user = userData;
			locals.jwt = jwt;
		}
	} catch {
		// do nothing
	}

	return await resolve(event);
}) satisfies Handle;
