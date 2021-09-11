// Requires
const express = require('express');
const {
    getOrderProductById,
    destroyOrderProduct,
    updateOrderProduct
} = require('../db');
const {
    requireAdmin,
    verifyUserIsOrderProductOwner
} = require('./utils')

// Declarations
const orderProductsRouter = express.Router();

// USER: Update an order product
orderProductsRouter.patch('/:orderProductId', verifyUserIsOrderProductOwner, async (req, res, next) => {
    try {
        const {price, quantity} = req.body
        const {orderProductId} = req.params
        const updatedProduct = await updateOrderProduct({orderProductId, price, quantity})
        if (updatedProduct) {
            res.send(updatedProduct)
        }
        else {
            next({
                name:"OrderProductNotUpdated",
                message:"The item on this order was not updated."
            })
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})

// USER: Remove product from order
orderProductsRouter.delete('/:orderProductId', verifyUserIsOrderProductOwner, async (req, res, next) => {
    try {
        const {orderProductId:id} = req.params
        const updatedProduct = await destroyOrderProduct(id)
        if (updatedProduct) {
            res.send(updatedProduct)
        }
        else {
            next({
                name:"OrderProductNotRemoved",
                message:"The item on this order was not removed."
            })
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
})

// ADMIN: Get orders in which a product was sold
orderProductsRouter.get('/:orderProductId', requireAdmin, async (req, res, next) => {
    try {
        const {orderProductId:id} = req.params
        const orders = await getOrderProductById(id); 
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

module.exports = orderProductsRouter;