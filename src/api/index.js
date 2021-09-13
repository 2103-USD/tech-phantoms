import axios from 'axios';
import {BASE_URL} from './auth'
export * from './products'
export * from './users'
export * from './orders'
export * from './order_products'
export * from './auth'
export const STRIPE_KEY="pk_test_51JYbIZJjKKlhCIcocvja3IsGjuWw87lUfiw5NV5Z4ipnFyVOPHJlou88I48cSE3m0fUQ6ziMNROYdo1wS0xFEX9p00d2EYIung"

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
