import axios from 'axios';

//export const BASE_URL = 'https://fast-savannah-33549.herokuapp.com/api';
export const BASE_URL = 'http://localhost:5000/api';

// Auth Functions
export function storeCurrentUser(data) {
    localStorage.setItem('currentUser', JSON.stringify(data.user));
    localStorage.setItem('currentUsername', JSON.stringify(data.user.username));
    localStorage.setItem('currentUserID', JSON.stringify(data.user.id));
    localStorage.setItem('currentToken', JSON.stringify(data.token));
}

export function clearCurrentUser() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUsername');
    localStorage.removeItem('currentUserID');
    localStorage.removeItem('currentToken');
}

export function GetCurrentUser() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user;
}

export function GetCurrentUserID() {
    const userID = localStorage.getItem('currentUserID');
    return userID;
}

export function GetCurrentUsername() {
    const userName = JSON.parse(localStorage.getItem('currentUsername'));
    return userName;
}

export function getCurrentToken() {
    const token = JSON.parse(localStorage.getItem('currentToken'));
    return token;
}


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

// User Functions
export async function registerNewUser( username, password) {
    const URL = `${BASE_URL}/users/register`
    try {
        const {data} = await axios.post(`${URL}`, {
            username,
            password
        })
        storeCurrentUser(data)
        return data
    } catch (error) {
        console.error(error)
    }
};

export async function loginExistingUser(username, password) {
    const URL = `${BASE_URL}/users/login`
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

export async function GetLoggedInUser() {
    const URL = `${BASE_URL}/users/me`
    try {
        const {data} =  await axios.get(`${URL}`)
        return data
    } catch (error) {
        console.error(error)
    }
}

// Product Functions
export async function getAllProducts() {
    const URL = `${BASE_URL}/products`
	try {
		const {data} = await axios.get(`${URL}`);
		return data;
	} catch (error) {
		throw error;
	}
}

export async function getProduct(id) {
    const URL = `${BASE_URL}/products/${id}`
	try {
		const {data} = await axios.get(`${URL}`);
		return data;
	} catch (error) {
		throw error;
	}
}