// Requires
const express = require('express');
const jwt = require('jsonwebtoken');
const {
    getOrderById,
    getAllOrders,
    getOrdersbyUser,
    getOrdersByProduct,
    getCartByUser,
    createOrder
} = require('../db');

// Declarations
const ordersRouter = express.Router();


ordersRouter.get('/', async (req, res, next) => {
    try {
        if (req.user) {
            const {id} = req.user
            const user = await getUserById(id); 
            if (user.isAdmin) {
                const orders = await getAllOrders(); 
                res.send(orders)
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

ordersRouter.get('/cart', async (req, res, next) => {
    try {
        if (req.user) {
            // The specs call for a user to be logged in to retrieve a cart.
            // Is this proper? or do we want to be able to allow for adding to cart before creating an account?
            const {id} = req.user
            const user = await getUserById(id); 
            const order = await getCartByUser(id); // Do we want to pass in a userId or a user object? 
            if (order) {
                res.send(order)
            }
            else {
                res.status(404)
                next({
                    name:"CartNotFound",
                    message:"You do not have an active cart."
                })
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

ordersRouter.post('/', async (req, res, next) => {
    try {
        if (req.user) {
            // The specs call for a user to be logged in to retrieve a cart.
            // Is this proper? or do we want to be able to allow for adding to cart before creating an account?
            const {id} = req.user;
            // const user = await getUserById(id); 
            const order = await createOrder({status:"created", userId: id}); // Do we want to pass in a userId or a user object? 
            if (order) {
                res.send(order)
            }
            else {
                res.status(404)
                next({
                    name:"CartNotFound",
                    message:"You do not have an active cart."
                })
            }
        }
        else {
            res.status(401);
            next({
                name: "NotLoggedIn",
                message: "You must log in before you can create a cart."
            });
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})
