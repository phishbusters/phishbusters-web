import { apiEndpoints } from '$lib/api';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
	const { jwt } = locals;
	if (!jwt) {
		return new Response('Unauthorized', { status: 401 });
	}

	const response = await apiEndpoints.user.validateUserSign(jwt);
	console.log(response);
	if (!response.success) {
		return new Response(response.message, { status: 400 });
	}

	return new Response(undefined, { status: 200 });
};
