import type { SignServerRequest } from '../../routes/api/validate-user-sign/+server';
import {
	unauthenticatedPost,
	authenticatedGet,
	authenticatedPost,
	authenticatedPut,
	authenticatedFormPost
} from './calls';
import type { AssetType, Credentials, DigitalAsset, ServerDigitalAsset, User } from './types';

export const session = {
	login: async (email: string, password: string) =>
		await unauthenticatedPost<Credentials>('/user/login', {
			username: email,
			password
		})
};

type CreateUser = {
	username: string;
	password: string;
	companyName: string;
	confirmPassword: string;
};

type UpdateUser = Partial<User>;
// type UpdateUser = Pick<User, 'email' | 'location' | 'dni' | 'firstName' | 'lastName'>;
export const user = {
	me: async (jwt: string) => await authenticatedGet<User>('/user', jwt),
	create: async (newUser: CreateUser) =>
		await unauthenticatedPost<{ user: User }>('/user', newUser),
	update: async (jwt: string, updatedUser: UpdateUser) =>
		await authenticatedPut<User>('/user', jwt, updatedUser),
	validateUserSign: async (jwt: string, data: SignServerRequest) =>
		await authenticatedPost('/user/sign-auth', jwt, data)
};

export type CreateDigitalAsset = {
	assetType: AssetType;
	value: string;
};

export const digitalAsset = {
	get: async (jwt: string) => await authenticatedGet<ServerDigitalAsset[]>('/assets', jwt),
	create: async (jwt: string, digitalAsset: CreateDigitalAsset[]) =>
		await authenticatedPost<{ assets: CreateDigitalAsset[] }>('/assets', jwt, {
			newAssets: digitalAsset
		}),
	uploadImage: async (jwt: string, formData: FormData) =>
		await authenticatedFormPost<DigitalAsset>('/assets/images', jwt, formData)
};

interface PhishingStatsResponse {
	sinceCreation: {
		totalPhishingChats: number;
		totalFakeProfiles: number;
		totalComplaintsClosed: number;
		totalComplaintsCreated: number;
		totalComplaintsInProgress: number;
	};
	lastSevenDays: {
		date: Date;
		phishingChatsDetected: number;
		fakeProfilesDetected: number;
		complaintsClosed: number;
		complaintsCreated: number;
		complaintsInProgress: number;
		complaintsNotExecuted?: number;
	}[];
	falsePositiveAndInteractions: {
		falsePositiveCount: number;
		positivesCount: number;
		interactionRateForFalsePositive: number;
		interactionRateForPositives: number;
		interactionRates: {
			date: Date;
			interactionRateGeneral: number;
			interactionRateForFalsePositive: number;
			interactionRateForPositives: number;
		}[];
	};
	detectionAmount: {
		detectedBySystem: number;
		detectedByUser: number;
	};
}

export const phishingStats = {
	get: async (jwt: string) => await authenticatedGet<PhishingStatsResponse>('/phishing-stats', jwt)
};
