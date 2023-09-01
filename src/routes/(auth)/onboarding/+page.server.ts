import { apiEndpoints } from '$lib/api';
import { AssetType } from '$lib/api/types';
import { formBody } from '$lib/form-helper';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const showOnboarding = locals.user?.flags?.shouldSeeOnboarding || false;
	if (!showOnboarding) {
		throw redirect(307, '/');
	}

	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const { jwt, user } = locals;
		if (!jwt) {
			return fail(401);
		}

		const formData = await request.formData();
		const body = formBody(formData);
		const { companyName, companyWebSite } = body;

		if (!companyName || !companyWebSite) {
			return fail(400, {
				data: body,
				input: {
					companyName: !companyName ? 'Este campo es obligatorio' : undefined,
					companyWebSite: !companyWebSite ? 'Este campo es obligatorio' : undefined
				}
			});
		}

		const createDigitalAsset = await apiEndpoints.digitalAsset.create(
			jwt,
			createServerRequest(body)
		);
		if (!createDigitalAsset.success) {
			return fail(500, { data: createDigitalAsset, message: 'Hubo un error inesperado' });
		}

		const newUser = { ...user, flags: { ...user.flags, shouldSeeOnboarding: false } };
		await apiEndpoints.user.update(jwt, newUser);
		return {};
	}
};

function createServerRequest(body: Record<string, unknown>): any[] {
	const result = [];
	const { companyWebSite, twitter, phone1, email1 } = body;

	result.push({
		assetType: AssetType.URL,
		value: companyWebSite
	});

	if (twitter) {
		result.push({
			assetType: AssetType.SocialNetworkUrl,
			value: twitter
		});
	}

	if (phone1) {
		result.push({
			assetType: AssetType.Phone,
			value: phone1
		});
	}

	if (email1) {
		result.push({
			assetType: AssetType.Email,
			value: email1
		});
	}

	return result;
}

// export enum AssetType {
//   Logo = 'Logo',
//   Image = 'Image',
//   URL = 'URL',
//   SocialNetworkUrl = 'SocialNetworkUrl',
//   Phone = 'phone',
//   Email = 'email',
//   PublicFaces = 'PublicFaces',
// }
