import { redirect } from '@sveltejs/kit';
import { VERCEL_ENV } from '$env/static/private';
import { PUBLIC_COOKIE_DOMAIN } from '$env/static/public';
import type { PageServerLoad } from './$types';
import { jwtCookie } from '$lib/server/cookie-manager';
import type { User } from '$lib/api/types';

export const load = (async ({ locals, cookies }) => {
	const { jwt } = locals;
	if (jwt) {
		if (VERCEL_ENV === 'development') {
			cookies.set(jwtCookie, '', { path: '/' });
		} else {
			cookies.set(jwtCookie, '', { path: '/', domain: PUBLIC_COOKIE_DOMAIN });
		}
	}

	locals.jwt = undefined;
	locals.user = undefined as unknown as User;
	throw redirect(303, '/login');
}) satisfies PageServerLoad;
