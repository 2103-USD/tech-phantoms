// Constants
const { JWT_SECRET } = process.env;

// Requires
const express = require('express');
const jwt = require('jsonwebtoken');
const apiRouter = express.Router();
const usersRouter = require ('./users');
const ordersRouter = require ('./orders');
const orderProductsRouter = require ('./orders');
const productsRouter = require ('./products');

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
    if (!auth) { // nothing to see here
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
a s
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



// Error Handler
apiRouter.use((error, req, res, next) => {
    res.send(error);
});

// Exports
module.exports = apiRouter;
