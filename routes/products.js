// Requires
const express = require('express');
const jwt = require('jsonwebtoken');
const {
    getProductById,
    getAllProducts,
    createProduct,
    destroyProduct,
    updateProduct,

} = require('../db');

// Declarations
const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await getAllProducts()
        if (products) {
            res.send(products)
        }
        next();
    } catch ({name, message}) {
        next({ name, message })
    }
});

productsRouter.get('/:productId', async (req, res, next) => {
    const {productId} = req.params
    try {
        const product = await getProductById(productId)
        if (product) {
            res.send(product)
            next();
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


module.exports = productsRouter