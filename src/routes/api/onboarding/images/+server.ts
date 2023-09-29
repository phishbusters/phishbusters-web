import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const file = await (await request.formData()).get('file');

		console.log('obtuve el archivo', file);
		return new Response(undefined, { status: 201 });
	} catch {
		return new Response(undefined, { status: 500 });
	}
};
