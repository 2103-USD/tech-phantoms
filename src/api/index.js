import axios from 'axios';

//export const BASE_URL = 'https://fast-savannah-33549.herokuapp.com/api';
export const BASE_URL = 'localhost:5000/api'

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
		const { data } = await axios.get(`${BASE_URL}/products`)
        return data;
	} catch (error) {
		throw error;
	}
}