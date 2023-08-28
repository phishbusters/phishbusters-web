export type Credentials = {
	username: string;
	token: string;
	refreshToken: string;
};

export type User = {
	username: string;
	userType: 'company' | 'client';
};
