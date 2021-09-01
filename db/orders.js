// Requires
const client = require("./client");

//Get order by ID
async function getOrderById(id) {
    try {
        //get order
        const {
            rows: [order],
        } = await client.query(
            `
            SELECT *
            FROM orders
            WHERE id = $1
      `,
            [id]
        );

        const { rows: products } = await client.query(
            `
            select op.id as "orderProductId", op."productId", op."orderId", op.price, op.quantity, 
                p. name, p.description, p."imageURL", p."inStock", p.category
            from order_products op
            join products p on op."productId" = p.id;
            where op."orderId" = $1;
            `,
            [id]
        );

        order.products = products;
        return order;
    } catch (error) {
        throw Error(error);
    }
}

//Get All Order Products
async function getAllOrderProducts() {
    try {
        //get order products
        const { rows: orderProducts } = await client.query(
            `
            select op.id as "orderProductId", op."productId", op."orderId", op.price, 
                op.quantity, p. name, p.description, p."imageURL", p."inStock", p.category
            from order_products op
            join products p on op."productId" = p.id;
            `
        );
    } catch (error) {
        throw Error(error);
    }
}

//Get All Orders
async function getAllOrders() {
    try {
        //get orders
        const { rows: orders } = await client.query(
            `
                SELECT *
                FROM orders;
            `
        );

        //get products
        const { rows: products } = await client.query(
            `
            select op.id as "orderProductId", op."productId", op."orderId", op.price, 
                op.quantity, p. name, p.description, p."imageURL", p."inStock", p.category
            from order_products op
            join products p on op."productId" = p.id;
            `
        );

        //combine orders with their products
        const orderProducts = orders.map((order) => {
            order.products = products.filter(
                (product) => product.orderId === order.id
            );
            return order;
        });

        return orderProducts;
    } catch (error) {
        throw Error(error);
    }
}

//Get Orders By User
async function getOrdersByUser({ id }) {
    try {
        //get user's orders
        const { rows: orders } = await client.query(
            `
                SELECT *
                FROM orders
                WHERE "userId" = $1;
                `,
            [id]
        );

        //get products
        const { rows: products } = await client.query(
            `
            select op.id as "orderProductId", op."productId", op."orderId", op.price, 
                op.quantity, p. name, p.description, p."imageURL", p."inStock", p.category
            from order_products op
            join orders o on op."orderId" = o.id
            join products p on op."productId" = p.id;
            where o."userId" = $1;
            `,
            [id]
        );

        //combine orders with their products
        const orderProducts = orders.map((order) => {
            order.products = products.filter(
                (product) => product.orderId === order.id
            );
            return order;
        });

        return orderProducts;
    } catch (error) {
        throw Error(error);
    }
}

//Get Orders by Product ID
async function getOrdersByProduct({ id }) {
    try {
        //get orders
        const { rows: orders } = await client.query(
            `
            select o.*
            from orders o
            join order_products op on o.id = op.id
            where op."productId" = $1;
            `,
            [id]
        );

        //get products
        const { rows: products } = await client.query(
            `
            select op.id as "orderProductId", op."productId", op."orderId", op.price, 
                op.quantity, p. name, p.description, p."imageURL", p."inStock", p.category
            from order_products op
            join orders o on op."orderId" = o.id
            join products p on op."productId" = p.id;
            where op."productId" = $1;
            `,
            [id]
        );

        //combine orders with their products
        const orderProducts = orders.map((order) => {
            order.products = products.filter(
                (product) => product.orderId === order.id
            );
            return order;
        });

        return orderProducts;
    } catch (error) {
        throw error;
    }
}

//get cart by user
async function getCartByUser({ id }) {
    try {
        //get user's orders
        const {
            rows: [order],
        } = await client.query(
            `
                SELECT *
                FROM orders
                WHERE "userId" = $1
                    AND status = 'created';
                `,
            [id]
        );

        //get products
        const { rows: products } = await client.query(
            `
            select op.id as "orderProductId", op."productId", op."orderId", op.price, 
                op.quantity, p. name, p.description, p."imageURL", p."inStock", p.category
            from order_products op
            join orders o on op."orderId" = o.id
            join products p on op."productId" = p.id;
            where op."userId" = $1
                AND o.status = 'created';
            `,
            [id]
        );

        order.products = products;
        return order;
    } catch (error) {
        throw error;
    }
}

//create order
async function createOrder({ status, userId }) {
    try {
        //get orders
        const {
            rows: [order],
        } = await client.query(
            `
            INSERT INTO orders (status, "userId")
            VALUES ($1, $2)
            RETURNING *;
            `,
            [status, userId]
        );
        return order;
    } catch (error) {
        throw error;
    }
}

//update order
async function updateOrder({ id, status, userId }) {
    try {
        //update order
        const {
            rows: [order],
        } = await client.query(
            `
            UPDATE orders
            SET status = $2, "userId" = $3
            WHERE id = $1
            RETURNING *;
            `,
            [id, status, userId]
        );
        return order;
    } catch (error) {
        throw error;
    }
}

//complete order
async function completeOrder({ id }) {
    try {
        //update order
        const {
            rows: [order],
        } = await client.query(
            `
            UPDATE orders
            SET status = 'completed'
            WHERE id = $1
            RETURNING *;
            `,
            [id]
        );
        return order;
    } catch (error) {
        throw error;
    }
}

//cancel order
async function cancelOrder({ id }) {
    try {
        //cancel order
        const {
            rows: [order],
        } = await client.query(
            `
            UPDATE orders
            SET status = 'canceled'
            WHERE id = $1
            RETURNING *;
            `,
            [id]
        );
        return order;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getOrderById,
    getAllOrderProducts,
    getAllOrders,
    getOrdersByUser,
    getOrdersByProduct,
    getCartByUser,
    createOrder,
    updateOrder,
    completeOrder,
    cancelOrder,
};
