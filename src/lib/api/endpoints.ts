import { unauthenticatedPost, authenticatedGet, authenticatedPut } from './calls';
import type { Credentials, User } from './types';

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
// type UpdateUser = Pick<User, 'email' | 'location' | 'dni' | 'firstName' | 'lastName'>;
export const user = {
	me: async (jwt: string) => await authenticatedGet<User>('/user', jwt),
	create: async (newUser: CreateUser) => await unauthenticatedPost<{ user: User }>('/user', newUser)
	// update: async (jwt: string, updatedUser: UpdateUser) =>
	// 	await authenticatedPut<User>('/user', jwt, updatedUser)
};
