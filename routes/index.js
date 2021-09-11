// Constants
// const  {JWT_SECRET}  = process.env;
// When JWTSecret is defined here, it is unavailable for use in apiRouter. Why???

// Requires
const express = require('express');
const jwt = require('jsonwebtoken');
const apiRouter = express.Router();
const usersRouter = require ('./users');
const ordersRouter = require ('./orders');
const orderProductsRouter = require ('./order_products');
const productsRouter = require ('./products');
const reviewsRouter = require ('./reviews');

const { getUserById } = require('../db');

apiRouter.get("/", (req, res, next) => {
    res.status(418);
    res.send({
        message: "API is under construction!"
    });
});

apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    const  {JWT_SECRET}  = process.env;
    if (!auth) { // nothing to see here
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
        try {
            const { id } = jwt.verify(token, JWT_SECRET);
            if (id) {
                req.user = await getUserById(id);
                next();
            }
        } catch ({ name, message }) {
            next({ name, message });
        }
    } else {
        next({ 
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${ prefix }`
        });
    }
});   

apiRouter.get('/health', async (req, res) => {
    console.log(`Dr. Server says we're ok.`);
    res.status(200);
    res.send({
        name:"Healthy",
        message: "Server is up."
    })
});

apiRouter.use('/users', usersRouter)
apiRouter.use('/orders', ordersRouter)
apiRouter.use('/products', productsRouter)
apiRouter.use('/order_products', orderProductsRouter)
apiRouter.use('/reviews', reviewsRouter)

// Error Handler
apiRouter.use((error, req, res, next) => {
    res.send(error);
});

// Exports
module.exports = apiRouter;
