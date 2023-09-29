import { writable } from 'svelte/store';
import type { ServerRequestBodyEndpoint } from '../../routes/api/onboarding/+server';

export interface StepData {
	step: number;
	data: ServerRequestBodyEndpoint;
}

const defaultData = {
	companyWebSite: '',
	companyName: '',
	emails: [''],
	phones: [''],
	socialNetworks: {
		facebook: '',
		instagram: '',
		linkedIn: '',
		twitter: ''
	}
};
const createOnboardingStore = () => {
	const { subscribe, set, update } = writable<StepData>({
		step: 0,
		data: defaultData
	});

	return {
		subscribe,
		nextStep: (newData: ServerRequestBodyEndpoint) => {
			update((state) => {
				state.data = { ...state.data, ...newData, input: undefined };
				state.step++;
				return state;
			});
		},
		prevStep: () =>
			update((state) => {
				if (state.step === 0) return state;

				state.step--;
				return state;
			}),
		reset: () => set({ step: 0, data: defaultData }),
		setError: (field: keyof ServerRequestBodyEndpoint, error: string) =>
			update((state) => ({
				...state,
				data: {
					...state.data,
					input: {
						...state.data.input,
						[field]: error
					}
				}
			})),
		cleanErrors: () =>
			update((state) => {
				return { ...state, data: { ...state.data, input: undefined } };
			}),
		addPhone: () =>
			update((state) => {
				state.data.phones.push('');
				return state;
			}),
		addEmail: () =>
			update((state) => {
				state.data.emails.push('');
				return state;
			}),
		set: (newData: ServerRequestBodyEndpoint) => update((state) => ({ ...state, ...newData }))
	};
};

const stepper = createOnboardingStore();

export { stepper };
