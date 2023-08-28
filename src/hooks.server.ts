import { apiEndpoints } from '$lib/api';
import { jwtCookie } from '$lib/server/cookie-manager';
import type { User } from '$lib/types/user';
import type { Handle } from '@sveltejs/kit';

const handleSession = async (jwt?: string): Promise<User | null> => {
	if (!jwt) {
		return null;
	}

	const callMe = await apiEndpoints.user.me(jwt);
	return callMe.data || null;
};

export const handle = (async ({ event, resolve }) => {
	const { cookies, locals } = event;
	const jwt = cookies.get(jwtCookie);
	const session = await handleSession(jwt);
	if (session) {
		locals.username = session.username;
	}

	return await resolve(event);
}) satisfies Handle;
