import type { User } from '$lib/types/user';
import type { Handle } from '@sveltejs/kit';

const handleSession = async (jwt?: string): Promise<User | null> => {
	if (!jwt) {
		return null;
	}

	// const callMe = await endpoint.get.me();
	const callMe = {
		username: 'test'
	};
	
	return callMe
};

export const handle = (async ({ event, resolve }) => {
	const { cookies, locals } = event;
	const jwt = cookies.get('jwt');
	const session = await handleSession(jwt);
	if (session) {
		locals.username = session.username;
	}	

	return await resolve(event);
}) satisfies Handle;
