import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { apiEndpoints } from '$lib/api';
import { isValidEmail, isValidPassword } from '$lib/utils/validators';

export const ssr = false;

export const load = (async ({ locals }) => {
	const { jwt } = locals;
	if (jwt) {
		throw redirect(307, '/');
	}

	return {};
}) satisfies PageServerLoad;

function sanitizeFormData(form: RegisterForm): RegisterForm {
	return {
		...form,
		password: '',
		confirmPassword: ''
	};
}

type RegisterForm = {
	companyName: string;
	username: string;
	password: string;
	confirmPassword: string;
	rememberMe: string;
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const registerForm = Object.fromEntries(formData) as RegisterForm;
		const errors: Record<string, unknown> = {};
		if (!registerForm.companyName) {
			errors.companyName = 'required';
		}

		if (!isValidEmail(registerForm.username)) {
			errors.username = 'required';
		}

		if (!isValidPassword(registerForm.password)) {
			errors.password = 'required';
		}

		if (registerForm.password !== registerForm.confirmPassword) {
			errors.confirmPassword = 'required';
		}

		if (!registerForm.rememberMe || registerForm.rememberMe !== 'on') {
			errors.rememberMe = 'required';
		}

		if (Object.keys(errors).length > 0) {
			const returnData = {
				data: sanitizeFormData(registerForm),
				errors
			};

			return fail(400, returnData);
		}

		const registerResponse = await apiEndpoints.user.create({
			companyName: registerForm.companyName,
			username: registerForm.username,
			confirmPassword: registerForm.confirmPassword,
			password: registerForm.password
		});

		if (registerResponse.success) {
			throw redirect(307, '/login');
		}

		return fail(400, {
			errors: {
				apiError: registerResponse.message || '',
				username: undefined,
				password: undefined,
				confirmPassword: undefined,
				companyName: undefined
			},
			data: sanitizeFormData(registerForm)
		});
	}
};
