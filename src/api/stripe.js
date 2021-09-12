import axios from 'axios';
import {BASE_URL, getHeaders} from './auth'
require ('stripe')

export const STRIPE_KEY="pk_test_51JYbIZJjKKlhCIcocvja3IsGjuWw87lUfiw5NV5Z4ipnFyVOPHJlou88I48cSE3m0fUQ6ziMNROYdo1wS0xFEX9p00d2EYIung"

const SectionURL = `${BASE_URL}/stripe`;


//************* Payment Functions
export async function processCardPayment(orderId, total, userId, email) {
    const URL = `${SectionURL}/${orderId}`
	try {
		const { data } = await axios.post(`${URL}`, {
            orderId, total, userId, email
        });
        console.log("API_processCardPayment", data)
		return data;
	} catch (error) {
        console.log(error)
		throw error;
	}
}

export async function handleStripeToken(token, total) {
    const URL = `${SectionURL}/pay`
    const response = await axios.post(`${URL}`, {
        token, total
    }, getHeaders());
    const { status } = response.data;
    // console.log("Response:", response.data);
    if (status === "success") {
    //   toast("Success! Check email for details", { type: "success" });
    } else {
    //   toast("Something went wrong", { type: "error" });
    }
    return response
  }
