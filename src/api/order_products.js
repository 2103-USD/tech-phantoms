import axios from 'axios';
import {BASE_URL, getHeaders} from './auth'

const SectionURL = `${BASE_URL}/order_products`;

export async function updateProductInOrder(orderProductId, price, quantity) {
    const URL = `${SectionURL}/${orderProductId}`
    try {
        const {data} = await axios.patch(`${URL}`,{
            price,
            quantity
        }, getHeaders());
        return data;
    }
    catch (error) {
        throw error;
    }
}

export async function removeProductFromOrder(orderProductId) {
    const URL = `${SectionURL}/${orderProductId}`
    try {
        const {data} = await axios.delete(`${URL}`,
            getHeaders());
        return data;
    }
    catch (error) {
        throw error;
    }
}

