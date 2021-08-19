// Requires
const express = require('express');
const jwt = require('jsonwebtoken');
const {
    createUser,
    getUser, 
    getAllUsers,
    getUserById,
    getUserNameByUsername, 
    updateUser
} = require('../db');

// Declarations
const usersRouter = express.Router();

usersRouter.post('/register', async (req, res, next) => {
    try {
        const { username, password} = req.body;
        const _user = await getUserNameByUsername(username);
        if (_user) {
            console.log("UserExistsError")
            res.status(401);
            next({
                name: 'UserExistsError',
                message: 'A user by that username already exists. Please choose a new usern.'
            });
        } else if (password.length < 8 ) {
            console.log("PassLenError")
            res.status(401);
            next({
                name: 'password-too-short',
                message: 'Password is too short. 8 or more characters are required. '
            });
        } else {
            const user = await createUser({
                username,
                password
            });
            console.log("CreateUser Result==>>",user)
            if (user){
                const token = jwt.sign({ 
                    id: user.id, 
                    username
                }, process.env.JWT_SECRET, {
                    expiresIn: '1w'
                });
    
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


usersRouter.post('/login', async (req, res, next) => {
    try {
        // request must have both username and password
        const { username, password} = req.body;
        if (!username || !password) {
            res.status(401);
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

    } catch ({ name, message }) {
        next({ name, message })
    }
})


usersRouter.get('/me', async (req, res, next) => {
    try {
        if (req.user) {
            const {id} = req.user
            const user = await getUserById(id); 
            res.send(user)
        }
        else {
            res.status(401);
            next({
                name: "NotLoggedIn",
                message: "You must log in first"
            });
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})

usersRouter.get('/', async (req, res, next) => {
    try {
        if (req.user) {
            const {id} = req.user
            const user = await getUserById(id); 
            if (user.isAdmin) {
                const users = await getAllUsers(); 
                res.send(users)
            }
            else {
                res.status(401);
                next({
                    name: "AdminLoginRequired",
                    message: "Only admins are allowed to retrieve this information"
                });
            }
        }
        else {
            res.status(401);
            next({
                name: "NotLoggedIn",
                message: "You must log in first"
            });
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})

usersRouter.patch('/:userId', async (req, res, next) => {
    try {
        if (req.user) {
            const {id, firstName, lastName, email, imageURL, username, password} = req.user
            const user = await getUserById(id); 
            if (user.isAdmin) {
                const user = await updateUser(
                    id,
                    firstName,
                    lastName,
                    email, 
                    imageURL, 
                    username,
                    password
                ); 
                res.send(user)
            }
            else {
                res.status(401);
                next({
                    name: "AdminLoginRequired",
                    message: "Only admins are allowed to retrieve this information"
                });
            }
        }
        else {
            res.status(401);
            next({
                name: "NotLoggedIn",
                message: "You must log in first"
            });
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})