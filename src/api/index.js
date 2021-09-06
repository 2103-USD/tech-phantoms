import axios from 'axios';
import {BASE_URL} from './auth'
export * from './products'
export * from './users'
export * from './orders'
export * from './order_products'
export * from './auth'

// Site Health functions
export async function checkServerHealth() {
    const URL = `${BASE_URL}`
	try {
		const { data } = await axios.get(`${URL}/health`);
		return data;
	} catch (error) {
		throw error;
	}
}
