// Requires
const express = require('express');
const jwt = require('jsonwebtoken');
const {
    getProductById,
    getAllProducts,
    createProduct,
    destroyProduct,
    updateProduct,
    getOrdersByProduct,
    getAllProductsByCategory
} = require('../db');
const {
    requireUser, 
    requireAdmin
} = require('./utils')


// Declarations
const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await getAllProducts()
        if (products) {
            res.send(products)
        }
    } catch ({name, message}) {
        next({ name, message })
    }
});

productsRouter.post('/', requireAdmin, async (req, res, next) => {
    try {
        const {
            name,
            description,
            price,
            imageURL,
            inStock,
            category
        } = req.body
        const product = await createProduct({name, description, price, imageURL, inStock, category})
        if (product) {
            res.send(product)
        }
        else {
            next({
                name: "ProductNotCreated",
                message: "The item was not able to be created."
            })
        }
    } catch ({name, message}) {
        next({ name, message })
    }
})

productsRouter.get('/:productId', async (req, res, next) => {
    const {productId} = req.params
    try {
        const product = await getProductById(productId)
        if (product) {
            res.send(product)
        }
        else {
            res.status(404)
            next({
                name: "ProductNotFound",
                message: "The selected product was not found in the system."
            })
        }
    } catch ({name, message}) {
        next({ name, message })
    }
});

productsRouter.get('/:category', async (req, res, next) => {
    const {category} = req.params
    try {
        const product = await getAllProductsByCategory(category)
        if (product) {
            res.send(product)
        }
        else {
            res.status(404)
            next({
                name: "ProductNotFound",
                message: "The selected product was not found in the system."
            })
        }
    } catch ({name, message}) {
        next({ name, message })
    }
});

productsRouter.patch('/:productId', requireAdmin, async (req, res, next) => {
    try {
        const {
            name,
            description,
            price,
            imageURL,
            inStock,
            category
        } = req.body
        const {productId} = req.params
        const product = await getProductById(productId)
        if (product) {
            const updatedProduct = await updateProduct({name, description, price, imageURL, inStock, category})
            if (updatedProduct) {
                res.send(updatedProduct)
            }
            else {
                next({
                    name: "ProductNotUpdated",
                    message: "The item was not able to be created."
                })
            }
        }
        else {
            res.status(404)
            next({
                name: "ProductNotFound",
                message: "The selected product was not found in the system."
            })
        }
    } catch ({name, message}) {
        next({ name, message })
    }
})

productsRouter.get('/:productId/orders', requireAdmin , async (req, res, next) => {
    const {productId} = req.params
    try {
        const orders = await getOrdersByProduct({productId})
        if (orders) {
            res.send(orders)
        }
        else {
            next({
                name: "OrdersNotFound",
                message: "There are currently no orders with this item. Advertise more."
            })
        }
    } catch ({name, message}) {
        next({ name, message })
    }
});

productsRouter.delete('/:productId', requireAdmin , async (req, res, next) => {
    const {productId} = req.params
    // We need to verify what the return parameter is of destroyProduct, and adjust this function accordingly.
    try {
        const product = await destroyProduct({productId})
        if (product) {
            res.send(product)
        }
        else {
            next({
                name: "ProductNotDeleted",
                message: "The item was unable to be deleted at this time."
            })
        }
    } catch ({name, message}) {
        next({ name, message })
    }
});

module.exports = productsRouter