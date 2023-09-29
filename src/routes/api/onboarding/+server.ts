import { apiEndpoints } from '$lib/api';
import type { CreateDigitalAsset } from '$lib/api/endpoints.js';
import { AssetType } from '$lib/api/types';
import { json } from '@sveltejs/kit';

export type ServerRequestBodyEndpoint = {
	companyName: string;
	companyWebSite: string;
	socialNetworks: {
		twitter?: string;
		instagram?: string;
		facebook?: string;
		linkedIn?: string;
	};
	phones: string[];
	emails: string[];
	input?: {
		companyName?: string;
		companyWebSite?: string;
	};
	message?: string;
};

export const POST = async ({ request, locals }) => {
	const { jwt, user } = locals;
	if (!jwt) {
		return new Response('Unauthorized', { status: 401 });
	}

	if (!request.body) {
		return new Response('Bad request', { status: 400 });
	}

	const body = (await request.json()) as ServerRequestBodyEndpoint;
	const { companyName, companyWebSite } = body;

	if (!companyName || !companyWebSite) {
		return json({
			status: 400,
			body: {
				data: body,
				input: {
					companyName: !companyName ? 'Este campo es obligatorio' : undefined,
					companyWebSite: !companyWebSite ? 'Este campo es obligatorio' : undefined
				}
			}
		});
	}

	const payload = createServerRequest(body);
	console.log('create server request', payload);
	const createDigitalAsset = await apiEndpoints.digitalAsset.create(jwt, payload);
	if (!createDigitalAsset.success) {
		return json({
			status: 500,
			body: { data: createDigitalAsset, message: 'Hubo un error inesperado' }
		});
	}

	const newUser = { ...user, flags: { ...user.flags, shouldSeeOnboarding: false } };
	await apiEndpoints.user.update(jwt, newUser);

	return json({
		status: 200,
		body: { message: 'Datos enviados con éxito' }
	});
};

function createServerRequest(body: ServerRequestBodyEndpoint): CreateDigitalAsset[] {
	const result: CreateDigitalAsset[] = [];

	if (body.companyWebSite) {
		result.push({
			assetType: AssetType.URL,
			value: body.companyWebSite
		});
	}

	for (const [network, url] of Object.entries(body.socialNetworks)) {
		if (url) {
			result.push({
				assetType: AssetType.SocialNetworkUrl,
				value: `${network}:${url}`
			});
		}
	}

	for (const phone of body.phones) {
		if (phone) {
			result.push({
				assetType: AssetType.Phone,
				value: phone
			});
		}
	}

	for (const email of body.emails) {
		if (email) {
			result.push({
				assetType: AssetType.Email,
				value: email
			});
		}
	}

	return result;
}
