// Requires
const express = require('express');
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

// GUEST: Get list of all products
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

// GUEST: Get list of categories
productsRouter.get('/categories', async (req, res, next) => {
    try {
        const categories = await getAllCategories()
        if (categories) {
            res.send(categories)
        }
    } catch ({name, message}) {
        next({ name, message })
    }
});

// GUEST: Get info on a specific product
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

// GUEST: Get all products in particular category
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

// ADMIN: Create a new item
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

// ADMIN: Update an item
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
        const {productId:id} = req.params
        const product = await getProductById(id)
        console.log("ROUTEProduct", product)
        if (product) {
            const updatedProduct = await updateProduct({id, name, description, price, imageURL, inStock, category})
            if (updatedProduct) {
                res.send(updatedProduct)
            }
            else {
                next({
                    name: "ProductNotUpdated",
                    message: "The item was not able to be updated."
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

// ADMIN: Get orders for particular product
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

// ADMIN: Delete an item
productsRouter.delete('/:productId', requireAdmin , async (req, res, next) => {
    const {productId: id } = req.params
    // We need to verify what the return parameter is of destroyProduct, and adjust this function accordingly.
    try {
        const product = await destroyProduct({id})
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