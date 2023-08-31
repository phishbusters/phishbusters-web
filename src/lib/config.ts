import { PUBLIC_API_URL } from '$env/static/public';

export const getConfig = () => {
	return {
		apiUrl: PUBLIC_API_URL || 'http://localhost:8000'
	};
};
