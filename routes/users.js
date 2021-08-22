// Requires
const express = require('express');
const jwt = require('jsonwebtoken');
const {
    createUser,
    getUser, 
    getAllUsers,
    getUserById,
    getUserNameByUsername, 
    updateUser,
    getOrdersbyUser
} = require('../db');
const {
    requireUser, 
    requireAdmin
} = require('./utils')

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
        else {
            res.status(401);
            next({
                name: "InvalidCredentials",
                message: "Username or Password are incorrect, or this account does not exist."
            });
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})


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

usersRouter.patch('/:userId', requireAdmin, async (req, res, next) => {
    try {
        const {userId: id} = req.params;
        const {
            firstName,
            lastName,
            email, 
            imageURL, 
            username,
            password
        } = req.body;

        const user = await updateUser(
            id,
            firstName,
            lastName,
            email, 
            imageURL, 
            username,
            password
        ); 
        if (user) {
            res.send(user) 
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})

usersRouter.get('/:userId/orders', requireUser, async (req, res, next) => {
    try {
        const {userId: id} = req.params;
        const orders = await getOrdersbyUser(id); // Do we want to pass in a userId or a user object? 
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

module.exports = usersRouter