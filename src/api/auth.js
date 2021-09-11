export const BASE_URL = 'https://fast-savannah-33549.herokuapp.com/api';
//export const BASE_URL = 'http://localhost:5000/api';

//************* Auth Functions
export function storeCurrentUser(data) {
    localStorage.setItem('currentUser', JSON.stringify(data.user));
    localStorage.setItem('currentToken', JSON.stringify(data.token));
}

export function storeCurrentCart(data) {
    localStorage.setItem('currentCart', JSON.stringify(data.id));
}

export function clearCurrentUser() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentToken');
    localStorage.removeItem('currentCart');
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

export function GetCurrentCart() {
    const user = JSON.parse(localStorage.getItem('currentCart'));
    return user;
}

export function getHeaders() {
    return {
        headers: {
            'Content-type': 'application/json' ,
            Authorization: `Bearer ${getCurrentToken()}`
        }
    }
}



