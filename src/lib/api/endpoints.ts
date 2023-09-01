import {
	unauthenticatedPost,
	authenticatedGet,
	authenticatedPost,
	authenticatedPut
} from './calls';
import type { AssetType, Credentials, User } from './types';

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
		await authenticatedPut<User>('/user', jwt, updatedUser)
};

type CreateDigitalAsset = {
	assetType: AssetType;
	value: string;
};

export const digitalAsset = {
	create: async (jwt: string, digitalAsset: CreateDigitalAsset[]) =>
		await authenticatedPost<{ assets: CreateDigitalAsset[] }>('/assets', jwt, {
			newAssets: digitalAsset
		})
};
