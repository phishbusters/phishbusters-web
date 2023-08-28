import { apiEndpoints } from '$lib/api';
import { newSession } from '$lib/server/cookie-manager';
import { isValidEmail } from '$lib/utils/validators';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const isEmailOk = isValidEmail(email);
		if (isEmailOk) {
			const loginApi = await apiEndpoints.session.login(email, password);
			if (loginApi.success && loginApi.data) {
				const { token } = loginApi.data;
				newSession(cookies, email, token);
				throw redirect(302, '/home');
			} else {
				return {
					email,
					errorMessage: loginApi.message || 'Ha ocurrido un error inesperado.'
				};
			}
		}

		return {
			email,
			errorMessage: 'El email no es correcto'
		};
	}
};
