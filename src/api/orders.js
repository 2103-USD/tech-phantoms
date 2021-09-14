import axios from 'axios';
import {BASE_URL, getHeaders} from './auth'

const SectionURL = `${BASE_URL}/orders`;

//************* Order Functions
export async function getAllOrders() {
    const URL = `${SectionURL}/`
	try {
		const {data} = await axios.get(`${URL}`,
            getHeaders());
		return data;
	} catch (error) {
		throw error;
	}
}

export async function getAllOrders() {
    const URL = `${SectionURL}/mine`
	try {
		const {data} = await axios.get(`${URL}`,
            getHeaders());
		return data;
	} catch (error) {
		throw error;
	}
}

export async function createNewOrder() {
    const URL = `${SectionURL}/`
    const status = "created"
    try {
		const {data:cart} = await axios.post(`${URL}`,{
            status
        },
            getHeaders());
        return cart;
    }
    catch (error) {
        throw error;
    }
}

export async function getOpenCart() {
    const URL = `${SectionURL}/cart`
	try {
		const {data:cart} = await axios.get(`${URL}`,
            getHeaders());
		return cart;
	} catch (error) {
		throw error;
	}
}

export async function addItemToCart(productId, price, quantity, orderId) {
    const URL = `${SectionURL}/${orderId}/products`
    try {
        const {data} = await axios.post(`${URL}`,{
            productId,
            price,
            quantity
        }, getHeaders());
        return data;
    }
    catch (error) {
        throw error;
    }
}

export async function updateOrderStatus(orderId, status) {
    const URL = `${SectionURL}/${orderId}`
    try {
        const {data} = await axios.patch(`${URL}`,{
            status
        }, getHeaders());
        return data;
    }
    catch (error) {
        throw error;
    }
}

export async function completeOrder(orderId, paymentId, paymentType, paymentAmt, paymentURL) {
    const URL = `${SectionURL}/${orderId}/complete`
    try {
        const {data} = await axios.post(`${URL}`,{
            paymentId,
            paymentType,
            paymentAmt,
            paymentURL
        }, getHeaders());
        return data;
    }
    catch (error) {
        throw error;
    }
}

export async function emptyCurrentCart(orderId) {
    const URL = `${SectionURL}/${orderId}/empty`
    try {
        const {data} = await axios.post(`${URL}`,{

        }, getHeaders());
        return data;
    }
    catch (error) {
        throw error;
    }
}

export async function cancelOrder(orderId) {
    const URL = `${SectionURL}/${orderId}`
    try {
        const {data} = await axios.delete(`${URL}`,
            getHeaders());
        return data;
    }
    catch (error) {
        throw error;
    }
}

