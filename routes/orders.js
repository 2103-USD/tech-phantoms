// Requires
const express = require('express');
const {
    getAllOrders,
    getOrdersByUser,
    getCartByUser,
    createOrder,
    addProductToOrder,
    updateOrder,
    cancelOrder,
    emptyCart,
    completeOrder
} = require('../db');
const {
    requireUser, 
    requireAdmin,
    verifyUserIsOrderOwner
} = require('./utils')

// Declarations
const ordersRouter = express.Router();

// USER: Create a new order
ordersRouter.post('/', requireUser, async (req, res, next) => {
    try {
        const {id} = req.user;
        const order = await createOrder({status:"created", userId: id});
        if (order) {
            res.send(order)
        }
        else {
            next({
                name:"OrderNotFound",
                message:"The order was not able to be created."
            })
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})

// USER: get a user's cart
ordersRouter.get('/cart', requireUser, async (req, res, next) => {
    try {
        const {id} = req.user
        const order = await getCartByUser({id});
        if (order) {
            res.send(order)
        }
        else {
            next({
                name:"CartNotFound",
                message:"You do not have an active cart."
            })
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})

// USER: empty a user's cart
ordersRouter.post('/:orderId/empty', verifyUserIsOrderOwner, async (req, res, next) => {
    try {
        const {orderId: id} = req.params
        const cart = await emptyCart({id});
        if (cart) {
            res.send(cart)
        }
        else {
            next({
                name:"CartNotFound",
                message:"You do not have an active cart."
            })
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})

// USER: Get all orders for user
ordersRouter.get('/orders', requireUser, async (req, res, next) => {
    try {
        const {id} = req.user
        const order = await getOrdersByUser(id);
        if (order) {
            res.send(order)
        }
        else {
            next({
                name:"OrdersNotFound",
                message:"You do not have any orders placed. Why not shop around?"
            })
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})

// USER: Add an item to the order
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

// USER: Complete an order
ordersRouter.post('/:orderId/complete', verifyUserIsOrderOwner, async (req, res, next) => {
    try {
        const {orderId: id} = req.params
        const {paymentId, paymentType, paymentAmt, paymentURL} = req.body
        const order = await completeOrder({id, paymentId, paymentType, paymentAmt, paymentURL})
        if (order) {
            res.send(order)
        }
        else{
            next({
                name:"OrderNotSaved",
                message:"The order was not able to be saved."
            })
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})

// USER: Update an order status
ordersRouter.patch('/:orderId', verifyUserIsOrderOwner, async (req, res, next) => {
    try {
        const {orderId: id} = req.params
        const {status} = req.body
        const {id: userId} = req.user
        const updatedOrder = await updateOrder({id, status, userId})
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

// USER: Delete an order
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

// ADMIN: Get all orders from system
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

module.exports = ordersRouter;