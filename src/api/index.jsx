import axios from 'axios';

export const BASE_URL = '';

export async function getSomething() {
	try {
		const { data } = await axios.get('/api');
		return data;
	} catch (error) {
		throw error;
	}
}

export async function getProducts() {
	try {
		
	} catch (error) {
		
	}
}
