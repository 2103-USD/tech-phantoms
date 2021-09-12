import axios from "axios";
import { BASE_URL, getHeaders, storeCurrentUser, storeCurrentCart } from "./auth";
import { getOpenCart, createNewOrder } from "./orders"

const SectionURL = `${BASE_URL}/users`;

// Register new user account
export async function registerNewUser( {
    username, 
    password,
    confirmpassword,
    firstName,
    lastName,
    email,
    imageURL
    }) {
    const URL = `${SectionURL}/register`
    try {
        const { data } = await axios.post(`${URL}`, {
            username,
            password,
            confirmpassword,
            firstName,
            lastName,
            email, 
            imageURL,
            isAdmin:0
        })
        if (data.user) {
            storeCurrentUser(data);
            
            const cart = await getOpenCart()
            if (cart.id) {
                storeCurrentCart(cart)
            } else {
                const newCart = await createNewOrder()
                storeCurrentCart(newCart)
            }
        }
        return data
    } catch (error) {
        console.error(error);
    }
}

// Login with pre-existing user account
export async function loginExistingUser({username, password}) {
    const URL = `${SectionURL}/login`
    try {
        const { data } = await axios.post(`${URL}`, {
            username,
            password,
        });
        if (data.user) {
            storeCurrentUser(data);
            
            const cart = await getOpenCart()
            if (cart.id) {
                storeCurrentCart(cart)
            } else {
                const newCart = await createNewOrder()
                storeCurrentCart(newCart)
            }
        }
        return {data};
    } catch (error) {
        console.error(error);
    }
}

// Get user object for self
export async function getCurrentUser() {
    const URL = `${SectionURL}/me`;
    try {
        const { data } = await axios.get(`${URL}`, getHeaders());
        return data;
    } catch (error) {
        console.error(error);
    }
}

// Get all users
export async function getAllUsers() {
    const URL = `${SectionURL}/`
    try {
        const { data } = await axios.get(`${URL}`, getHeaders());
        return data;
    } catch (error) {
        console.error(error);
    }
}

// Get user object for self
export async function getSpecificUser(userId) {
    const URL = `${SectionURL}/${userId}`;
    try {
        const { data } = await axios.get(`${URL}`, getHeaders());
        return data;
    } catch (error) {
        console.error(error);
    }
}

// Allows user to update their account information
export async function updateCurrentUser(
    id,
    username,
    password,
    firstName,
    lastName,
    email,
    imageURL
    ) {
    const URL = `${SectionURL}/me`
    try {
        const { data } = await axios.patch(
            `${URL}`,
            {
                username,
                password,
                firstName,
                lastName,
                email,
                imageURL,
            },
            getHeaders()
        );
        storeCurrentUser(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

// Allows admin to update a users account info
export async function adminUpdateUser({
    id,
    username,
    firstName,
    lastName,
    email,
    isAdmin,
    isActive
}) {
    const URL = `${SectionURL}/${id}`
    try {
        const { data } = await axios.patch(
            `${URL}`,
            {
                username,
                firstName,
                lastName,
                email,
                isAdmin,
                isActive
            },
            getHeaders()
        );
        return data;
    } catch (error) {
        console.error(error);
    }
}
