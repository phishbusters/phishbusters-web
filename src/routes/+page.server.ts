import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const session = locals.username;
  if (!session) {
    throw redirect(307, '/login');
  } else {
    throw redirect(307, '/home');
  }
}) satisfies PageServerLoad;