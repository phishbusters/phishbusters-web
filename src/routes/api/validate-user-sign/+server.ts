import { apiEndpoints } from '$lib/api';
import dayjs from 'dayjs';
import type { RequestHandler } from './$types';

export type SignServerRequest = {
	address: string;
	phone: string;
	email: string;
	renewalDate: string;
	legalName: string;
	legalTitle: string;
	signatureDataURL: string;
};

export const POST: RequestHandler = async ({ locals, request }) => {
	const { jwt } = locals;
	if (!jwt) {
		return new Response('Unauthorized', { status: 401 });
	}

	if (!request.body) {
		return new Response('Bad request', { status: 400 });
	}

	const body = (await request.json()) as SignServerRequest;
	body.renewalDate = dayjs(body.renewalDate).format('DD/MM/YYYY');
	const response = await apiEndpoints.user.validateUserSign(jwt, body);
	console.log(response);
	if (!response.success) {
		return new Response(response.message, { status: 400 });
	}

	return new Response(undefined, { status: 200 });
};
