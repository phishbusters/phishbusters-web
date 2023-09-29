import { getConfig } from '../config';

const getHeaders = {
	Accept: 'application/json'
};

const postHeaders = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
	'access-control-allow-origin': '*'
};

type Method = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
type ApiCallArgs = {
	url: string;
	method: Method;
	jwt?: string;
	body?: any;
	overrideHeaders?: HeadersInit | undefined;
};

type BasicResponse<T> = {
	success: boolean;
	message?: string;
	data?: T;
};
export const apiCall = async <T>({
	url,
	method,
	jwt,
	body,
	overrideHeaders = {}
}: ApiCallArgs): Promise<BasicResponse<T>> => {
	const { apiUrl: apiUrl } = getConfig();
	let absoluteUrl = url;
	if (!url.startsWith('/')) {
		absoluteUrl = `/${url}`;
	}

	const fullUrl = `${apiUrl}${absoluteUrl}`;
	try {
		const isFormData = body instanceof FormData;
		process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
		const response = await fetch(fullUrl, {
			method,
			headers: {
				...(isFormData ? {} : ['POST', 'PUT'].includes(method) ? postHeaders : getHeaders),
				...((jwt && { Authorization: `Bearer ${jwt}` }) || {}),
				...overrideHeaders
			},
			body: body && (isFormData ? body : JSON.stringify(body))
		});

		if (response.status === 401) {
			return {
				success: false,
				message: 'Lo que estas buscando parece que no existe'
			};
		}
		const responseMessage = await response.json();
		if (!response.ok) {
			const message = responseMessage.message;
			if (response.status === 401) {
				return {
					success: false,
					message: 'Lo que estas buscando parece que no existe'
				};
			}

			return {
				success: false,
				message: message || 'Ha ocurrido un error inesperado.'
			};
		}

		return { success: true, data: responseMessage };
	} catch (error: any) {
		console.log('ApiCall Error', error);
		return {
			success: false,
			message: error?.message || 'Ha ocurrido un error inesperado.'
		};
	}
};
