// Requires
const express = require('express');
const jwt = require('jsonwebtoken');
const {
    getOrderById,
    getAllOrders,
    getOrdersbyUser,
    getCartByUser,
    createOrder,
    addProductToOrder,
    updateOrder,
    cancelOrder
} = require('../db');
const {
    requireUser, 
    requireAdmin,
    verifyUserIsOrderOwner
} = require('./utils')

// Declarations
const ordersRouter = express.Router();

ordersRouter.get('/', requireAdmin, async (req, res, next) => {
    try {
        const orders = await getAllOrders(); 
        if (orders) {
            res.send(orders)
        }
        else {
            res.status(500)
            next({
                name:"OrdersNotFound",
                message:"There are currently no orders in the system. Start advertising the site."
            })
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})

ordersRouter.post('/', requireUser, async (req, res, next) => {
    try {
        // The specs call for a user to be logged in to retrieve a cart.
        // Is this proper? or do we want to be able to allow for adding to cart before creating an account?
        const {id} = req.user;
        // const user = await getUserById(id); 
        const order = await createOrder({status:"created", userId: id});
        if (order) {
            res.send(order)
        }
        else {
            res.status(404)
            next({
                name:"OrderNotFound",
                message:"The order was not able to be created."
            })
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})

ordersRouter.get('/cart', requireUser, async (req, res, next) => {
    try {
        // The specs call for a user to be logged in to retrieve a cart.
        // Is this proper? or do we want to be able to allow for adding to cart before creating an account?
        const {id} = req.user
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
    } catch ({ name, message }) {
        next({ name, message })
    }
})

ordersRouter.post('/:orderId/products', verifyUserIsOrderOwner, async (req, res, next) => {
    try {
        const {orderId} = req.params
        const {productId, price, quantity} = req.body
        const itemAdded = await addProductToOrder({orderId, productId, price, quantity})
        if (itemAdded) {
            res.send(itemAdded)
        }
        else{
            next({
                name:"ItemNotAdded",
                message:"The item was not able to be added to this order."
            })
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})

ordersRouter.patch('/:orderId', verifyUserIsOrderOwner, async (req, res, next) => {
    try {
        const {orderId} = req.params
        const {status, userId} = req.body
        const updatedOrder = await updateOrder({id:orderId, status, userId})
        if (updatedOrder) {
            res.send(updatedOrder)
        }
        else{
            next({
                name:"OrderNotUpdated",
                message:"The order was not updated."
            })
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})

ordersRouter.delete('/:orderId', verifyUserIsOrderOwner, async (req, res, next) => {
    try {
        const {orderId:id} = req.params
        const updatedOrder = await cancelOrder(id)
        if (updatedOrder) {
            res.send(updatedOrder)
        }
        else{
            next({
                name:"OrderNotDeleted",
                message:"The order was not deleted."
            })
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})
module.exports = ordersRouter;