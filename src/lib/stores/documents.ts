import { formatDate } from '$lib/utils/utils';
import { writable } from 'svelte/store';

type DigitalSignature = string;
export type DocumentStore = {
	legalName: string;
	legalTitle: string;
	digitalSignature: DigitalSignature;
	renewalDate: string;
	address: string;
	phone: string;
	email: string;
	errors: Omit<DocumentStore, 'errors'>;
};

const createLegalRepresentativeStore = () => {
	const today = new Date();
	const nextYear = new Date(today);
	nextYear.setFullYear(today.getFullYear() + 1);
	const initialValues = {
		legalName: '',
		legalTitle: '',
		digitalSignature: '',
		renewalDate: formatDate(nextYear, 'YYYY-MM-DD'),
		address: '',
		phone: '',
		email: '',
		errors: {
			legalName: '',
			legalTitle: '',
			digitalSignature: '',
			renewalDate: '',
			address: '',
			phone: '',
			email: ''
		}
	};

	const { subscribe, set, update } = writable(initialValues);
	return {
		subscribe,
		setLegalName: (name: string) => update((state) => ({ ...state, legalName: name })),
		setLegalTitle: (title: string) => update((state) => ({ ...state, legalTitle: title })),
		setDigitalSignature: (signature: DigitalSignature) =>
			update((state) => ({ ...state, digitalSignature: signature })),
		setRenewalDate: (date: string) => update((state) => ({ ...state, renewalDate: date })),
		setAddress: (address: string) => update((state) => ({ ...state, address: address })),
		setPhone: (phone: string) => update((state) => ({ ...state, phone: phone })),
		setEmail: (email: string) => update((state) => ({ ...state, email: email })),
		reset: () => set(initialValues),
		setError: (field: keyof DocumentStore['errors'], error: string) => {
			update((state) => {
				state.errors[field] = error;
				return state;
			});
		},
		clearErrors: () => {
			update((state) => {
				state.errors = initialValues.errors;
				return state;
			});
		}
	};
};

export const documentStore = createLegalRepresentativeStore();
