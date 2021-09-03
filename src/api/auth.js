export const BASE_URL = 'https://fast-savannah-33549.herokuapp.com/api';
//export const BASE_URL = 'http://localhost:5000/api';

//************* Auth Functions
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

export function getHeaders() {
    return {
        headers: {
            'Content-type': 'application/json' ,
            Authorization: `Bearer ${getCurrentToken()}`
        }
    }
}
