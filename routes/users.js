// Requires
const express = require('express');
const jwt = require('jsonwebtoken');
const {
    createUser,
    getUser, 
    getAllUsers,
    getUserById,
    getUserByUsername, 
    getUserNameByEmail,
    updateUser,
    updateUserByAdmin,
    getOrdersByUser
} = require('../db');
const {
    requireUser, 
    requireAdmin
} = require('./utils')

// Declarations
const usersRouter = express.Router();


// GUEST: Register a new user account
usersRouter.post('/register', async (req, res, next) => {
    try {
        const { 
                username, 
                password,
                confirmpassword,
                firstName,
                lastName,
                email, 
                imageURL
            } = req.body;
        const _username = await getUserByUsername(username);
        const _useremail = await getUserNameByEmail(email);
        if (_username) {
            next({
                name: 'UserExistsError',
                message: 'This username already exists. Please select a new username or login to your account.'
            });
        } else if (_useremail) {
            next({
                name: 'UserExistsError',
                message: 'An account already exists for this email address. Please login instead.'
            });
        } else if (password.length < 8 ) {
            next({
                name: 'password-too-short',
                message: 'Password is too short.\n8 or more characters are required. '
            });
        } else if (confirmpassword !== password) {
            next({
                name: 'passwords-dont-match',
                message: 'Your passwords do not match.\nPlease try again'
            });
        } else {
            const user = await createUser({
                username,
                password,
                firstName,
                lastName,
                email,
                imageURL,
                isAdmin:false
            });
            if (user){
                const token = jwt.sign({ 
                    id: user.id, 
                    username
                }, process.env.JWT_SECRET, {
                    expiresIn: '1w'
                });
                res.status(201)
                res.send({ 
                    user, token
                });
            } else {
                next({
                    // We need to test to see if this occurs, and what may prompt it.
                    name: 'Uh OH',
                    message: 'It dont work'
                })
            }
        }
    } catch ({ name, message }) {
        next({ name, message })
    } 
});

// GUEST: Login with an existing user ID
usersRouter.post('/login', async (req, res, next) => {
    try {
        // request must have both username and password
        const { username, password} = req.body;
        if (!username || !password) {
            next({
                name: "MissingCredentialsError",
                message: "Please supply both a username and password"
            });
        }

        const user = await getUser({
            username,
            password
        });

        if (user) {
            const token = jwt.sign({ 
                id: user.id, 
                username
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });
            res.send({ user, token});
        }
        else {
            next({
                name: "InvalidCredentials",
                message: "Username or Password are incorrect, or this account does not exist."
            });
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})

// USER: Show user's account information.
usersRouter.get('/me', requireUser, async (req, res, next) => {
    try {
        const {id} = req.user
        const user = await getUserById(id); 
        if (user) {
            res.send(user)
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})

// USER: get a user's orders
usersRouter.get('/:userId/orders', requireUser, async (req, res, next) => {
    try {
        const {userId: id} = req.params;
        const orders = await getOrdersByUser(id);
        if (orders) {
            res.send(orders)
        }
        else {
            res.status(404)
            next({
                name:"NoOrdersFound",
                message:"You do not have any orders placed."
            })
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})

// USER: Update user's own info
usersRouter.patch('/me', requireUser, async (req, res, next) => {
    // Allows user to update their own account information.
    try {
        // const {userId: id} = req.params;
        const {
            id,
            firstName,
            lastName,
            email, 
            imageURL, 
            username,
            password
        } = req.body;
        // const _username = await getUserByUsername(username);
        const _useremail = await getUserNameByEmail(email);

        if (_useremail) {
            next({
                name: 'UserExistsError',
                message: 'An account already exists for this email address. Please login instead.'
            });
        // } else if (password.length < 8 ) {
        //     next({
        //         name: 'password-too-short',
        //         message: 'Password is too short. 8 or more characters are required. '
        //     });
        } else {

            const user = await updateUser(
                id,
                firstName,
                lastName,
                email, 
                imageURL, 
                username,
                password
            ); 
            if (user){
                const token = jwt.sign({ 
                    id: user.id, 
                    username
                }, process.env.JWT_SECRET, {
                    expiresIn: '1w'
                });
                res.status(201)
                res.send({ 
                    user, token
                });
            } else {
                next({
                    // We need to test to see if this occurs, and what may prompt it.
                    name: 'Uh OH',
                    message: 'It dont work'
                })
            }
        }
        if (user) {
            res.send(user) 
        }
    } catch ({ name, message }) {
        console.error(name, message)
        next({ name, message })
    }
})

// ADMIN: Get users list
usersRouter.get('/', requireAdmin, async (req, res, next) => {
    try {
        const users = await getAllUsers(); 
        if (users) {
            res.send(users)
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})

// ADMIN: Get specific user info
usersRouter.get('/:userId', requireAdmin, async (req, res, next) => {
    try {
        const {userId: id} = req.params;
        const users = await getUserById(id); 
        if (users) {
            res.send(users)
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})

// ADMIN: Update a user
usersRouter.patch('/:userId', requireAdmin, async (req, res, next) => {
    try {
        const {userId: id} = req.params;
        const {
            firstName,
            lastName,
            email, 
            username,
            isAdmin,
            isActive
        } = req.body;
        const _username = await getUserByUsername(username);
        const _useremail = await getUserNameByEmail(email);
        if ((_username) || (_useremail)){
            if (_username === username) {
                next({
                    name: 'UserExistsError',
                    message: 'This username already exists. Please select a new username.'
                });
            }
            else if (_useremail === email) {
                next({
                    name: 'UserExistsError',
                    message: 'An account already exists for this email address. Please login instead.'
                });
            }
        } 
        const user = await updateUserByAdmin(
            id,
            firstName,
            lastName,
            email, 
            username,
            isAdmin,
            isActive
        ); 
        if (user) {
            res.send(user) 
        } else {
            next({
                // We need to test to see if this occurs, and what may prompt it.
                name: 'Uh OH',
                message: 'It dont work Internal'
            })
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})

module.exports = usersRouter