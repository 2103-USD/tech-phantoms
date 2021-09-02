// Requires
const express = require('express');
const jwt = require('jsonwebtoken');
const {
    getOrderProductById,
    destroyOrderProduct,
    updateOrderProduct
} = require('../db');
const {
    verifyUserIsOrderProductOwner
} = require('./utils')

// Declarations
const orderProductsRouter = express.Router();

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

orderProductsRouter.delete('/:orderProductId', verifyUserIsOrderProductOwner, async (req, res, next) => {
    try {
        const {price, quantity} = req.body
        const {orderProductId} = req.params
        const updatedProduct = await destroyOrderProduct({orderProductId, price, quantity})
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

module.exports = orderProductsRouter;