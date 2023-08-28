import { VERCEL_ENV } from '$env/static/private';
import { PUBLIC_COOKIE_DOMAIN } from '$env/static/public';
import type { Cookies } from '@sveltejs/kit';

type SessionInfo = {
	username: string;
	invalidAt: number;
};

export const jwtCookie = 'Auth';
const sessionMaxAge = 1000 * 60 * 60 * 24 * 30; // 30 days
const sessionStore = new Map<string, SessionInfo>();

function createSession(username: string, maxAge: number, jwt: string): string {
	sessionStore.set(jwt, {
		username,
		invalidAt: Date.now() + maxAge
	});

	return jwt;
}

function getSession(jwt: string): SessionInfo | undefined {
	const session = sessionStore.get(jwt);
	if (session) {
		if (Date.now() > session.invalidAt) {
			sessionStore.delete(jwt);
			return undefined;
		} else {
			return session;
		}
	} else {
		return undefined;
	}
}

function deleteSession(jwt: string) {
	sessionStore.delete(jwt);
}

export const newSession = (cookies: Cookies, username: string, jwt: string) => {
	if (getSession(jwt)) {
		return;
	}

	const sessionJwt = createSession(username, sessionMaxAge, jwt);
	if (VERCEL_ENV !== 'production') {
		cookies.set(jwtCookie, sessionJwt, {
			path: '/',
			maxAge: sessionMaxAge
		});
	} else {
		cookies.set(jwtCookie, sessionJwt, {
			path: '/',
			maxAge: sessionMaxAge,
			domain: PUBLIC_COOKIE_DOMAIN
		});
	}
};
