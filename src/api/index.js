import axios from 'axios';
import {BASE_URL} from './auth'
export * from './products'
export * from './users'
export * from './orders'
export * from './order_products'
export * from './auth'

// Site Health functions
export async function getSomething() {
    const URL = `${BASE_URL}`
	try {
		const { data } = await axios.get(`${URL}/`);
		return data;
	} catch (error) {
		throw error;
	}
}
