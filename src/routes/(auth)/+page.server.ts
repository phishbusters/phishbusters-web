import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const ssr = false;

export const load = (async () => {
	throw redirect(308, '/home');
}) satisfies PageServerLoad;
