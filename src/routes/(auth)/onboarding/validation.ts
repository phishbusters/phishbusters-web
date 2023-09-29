import type { StepData } from '$lib/stores/onboarding';

type ErrorFields = 'companyName' & 'companyWebSite';
export function validateCurrentStepData(
	step: number,
	data: StepData['data']
): Record<ErrorFields, string> | undefined {
	let errors: Record<ErrorFields, string> | undefined = undefined;
	if (step === 0) {
		if (!data.companyName) {
			errors = {
				...(errors || {}),
				companyName: 'El nombre de la empresa es requerido'
			};
		}

		if (!data.companyWebSite) {
			errors = {
				...(errors || {}),
				companyWebSite: 'El sitio web de la empresa es requerido'
			};
		}
	}

	return errors;
}
