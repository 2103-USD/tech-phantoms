import axios from 'axios';

//export const BASE_URL = 'https://fast-savannah-33549.herokuapp.com/api';
export const BASE_URL = 'http://localhost:5000/api';

export async function getSomething() {
	try {
		const { data } = await axios.get('/api');
		return data;
	} catch (error) {
		throw error;
	}
}
export async function getAllProducts() {
	try {
		const data = await fetch(`${BASE_URL}/products`);
		const result = await data.json();
		console.log('this is the result', result);
		return result;
	} catch (error) {
		throw error;
	}
}
