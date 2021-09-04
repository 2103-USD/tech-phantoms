import axios from 'axios';
import {BASE_URL, getHeaders} from './auth'

const SectionURL = `${BASE_URL}/products`;

//************* Product Functions
export async function getAllProducts() {
    const URL = `${SectionURL}/`
	try {
		const {data} = await axios.get(`${URL}`);
		return data;
	} catch (error) {
		throw error;
	}
}

export async function getAllCategories() {
    const URL = `${SectionURL}/categories`
	try {
		const {data} = await axios.get(`${URL}`);
		return data;
	} catch (error) {
		throw error;
	}
}

export async function getProduct(id) {
    const URL = `${SectionURL}/${id}`
	try {
		const {data} = await axios.get(`${URL}`);
		return data;
	} catch (error) {
		throw error;
	}
}

export async function getProductsByCategory(category) {
    const URL = `${SectionURL}/${category}`
	try {
		const {data} = await axios.get(`${URL}`);
		return data;
	} catch (error) {
		throw error;
	}
}

export async function createNewItem( 
    name,
    description,
    price,
    imageURL,
    inStock,
    category
    ) {
    const URL = `${SectionURL}/`
    try {
        const {data} = await axios.post(`${URL}`, {
            name,
            description,
            price,
            imageURL,
            inStock,
            category
        }, getHeaders())
        return data
    } catch (error) {
        console.error(error)
    }
};

export async function UpdateItem( 
    id,
    name,
    description,
    price,
    imageURL,
    inStock,
    category
    ) {
    const URL = `${SectionURL}/${id}`
    try {
        const {data} = await axios.post(`${URL}`, {
            name,
            description,
            price,
            imageURL,
            inStock,
            category
        }, getHeaders())
        return data
    } catch (error) {
        console.error(error)
    }
};
