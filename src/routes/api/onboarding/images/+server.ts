import { apiEndpoints } from '$lib/api';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	try {
		const { jwt } = locals;
		if (!jwt) {
			return new Response(undefined, { status: 401 });
		}

		const file = (await (await request.formData()).get('file')) as any;
		if (!file) {
			return new Response(undefined, { status: 400 });
		}

		const formData = new FormData();
		const upload = await apiEndpoints.digitalAsset.uploadImage(jwt, formData);
		if (upload.success) {
			console.log('Uploaded', upload);
			return new Response(undefined, { status: 201 });
		}

		return new Response(undefined, { status: 500 });
	} catch {
		return new Response(undefined, { status: 500 });
	}
};
