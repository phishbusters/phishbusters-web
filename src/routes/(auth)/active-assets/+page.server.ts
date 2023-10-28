import { apiEndpoints } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { AssetType, type ServerDigitalAsset } from '$lib/api/types';

export const ssr = false;

type GroupedAssets = {
	emails: { value: string; id: string }[];
	phones: { value: string; id: string }[];
	images: { value: string; id: string }[];
	socialMedia: { profile: string; name: string; id: string }[];
	companyData: {
		companyName: string;
		webSite: string;
		agreedAuth: boolean;
	};
};

export const load = (async ({ locals }) => {
	const { jwt, user } = locals;
	if (!jwt) {
		console.log('jwt', jwt, 'user', user);
		throw error(401, 'Parece que la pagina que intenta ver no es accesible.');
	}

	const activeAssets = (await apiEndpoints.digitalAsset.get(jwt)).data || [];
	return {
		assets: groupDigitalAssets(activeAssets, user.company?.companyName || '')
	};
}) satisfies PageServerLoad;

function groupDigitalAssets(assets: ServerDigitalAsset[], companyName: string): GroupedAssets {
	const groupedAssets: GroupedAssets = {
		emails: [],
		phones: [],
		images: [],
		socialMedia: [],
		companyData: {
			companyName,
			webSite: '',
			agreedAuth: true // Puedes cambiar esto según tus necesidades
		}
	};

	assets.forEach((asset) => {
		const { assetType, assetContent: value, _id: id } = asset;
		const item = { value, id: id || '' };

		switch (assetType) {
			case AssetType.Email:
				groupedAssets.emails.push(item);
				break;
			case AssetType.Phone:
				groupedAssets.phones.push(item);
				break;
			case AssetType.Logo:
			case AssetType.Image:
			case AssetType.PublicFaces:
				groupedAssets.images.push(item);
				break;
			case AssetType.SocialNetworkUrl:
				groupedAssets.socialMedia.push({
					name: value.split(':') ? value.split(':')[0] : value,
					profile: value.split(':') ? value.split(':')[1] : 'profile',
					id: id || ''
				});
				break;
			case AssetType.URL:
				groupedAssets.companyData.webSite = value;
				break;
		}
	});

	return groupedAssets;
}
