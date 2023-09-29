export type Credentials = {
	username: string;
	token: string;
	refreshToken: string;
};

export type CompanyData = {
	companyName: string;
	subscriptionStatus: 'Active' | 'Inactive';
	digitalAssets: unknown[];
	clients: unknown[];
};

export type User = {
	username: string;
	company?: CompanyData;
	userType: 'company' | 'client';
	flags: Flag;
};

export type Flag = {
	shouldSeeOnboarding: boolean;
};

export enum AssetType {
	Logo = 'Logo',
	Image = 'Image',
	URL = 'URL',
	SocialNetworkUrl = 'SocialNetworkUrl',
	Phone = 'phone',
	Email = 'email',
	PublicFaces = 'PublicFaces'
}

export type ServerRequestItem = {
	assetType: AssetType;
	value: string;
};

export type ServerRequestBody = {
	companyName: string;
	companyWebSite: string;
	socialNetworks: {
		twitter?: string;
		instagram?: string;
		facebook?: string;
		linkedIn?: string;
	};
	phones: string[];
	emails: string[];
};
