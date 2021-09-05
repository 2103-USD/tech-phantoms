import axios from 'axios';
import {BASE_URL, getHeaders, storeCurrentUser} from './auth'

const SectionURL = `${BASE_URL}/users`;

// Register new user account
export async function registerNewUser( 
    username, 
    password,
    firstName,
    lastName,
    email, 
    imageURL
    ) {
    const URL = `${BASE_URL}/register`
    try {
        const {data} = await axios.post(`${URL}`, {
            username,
            password,
            firstName,
            lastName,
            email, 
            imageURL
        })
        storeCurrentUser(data)
        return data
    } catch (error) {
        console.error(error)
    }
};

// Login with pre-existing user account
export async function loginExistingUser(username, password) {
    const URL = `${BASE_URL}/login`
    try {
        const {data} =  await axios.post(`${URL}`, {
            username,
            password
        })
        storeCurrentUser(data)
        return data
    } catch (error) {
        console.error(error)
    }
};

// Get user object for self
export async function getCurrentUser() {
    const URL = `${BASE_URL}/me`
    try {
        const {data} =  await axios.get(`${URL}`, 
            getHeaders())
        return data
    } catch (error) {
        console.error(error)
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
    const URL = `${BASE_URL}/me`
    try {
        const {data} = await axios.patch(`${URL}`, {
            username,
            password,
            firstName,
            lastName,
            email, 
            imageURL
        }, getHeaders())
        storeCurrentUser(data)
        return data
    } catch (error) {
        console.error(error)
    }
};

// Allows admin to update a users account info
export async function adminUpdateUser( 
    id,
    username, 
    password,
    firstName,
    lastName,
    email, 
    imageURL,
    isAdmin
    ) {
    const URL = `${BASE_URL}/${id}`
    try {
        const {data} = await axios.patch(`${URL}`, {
            username,
            password,
            firstName,
            lastName,
            email, 
            imageURL,
            isAdmin
        }, getHeaders())
        storeCurrentUser(data)
        return data
    } catch (error) {
        console.error(error)
    }
};