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
            SELECT *
            FROM order_products op
            JOIN products p on op."productId" = p.id
            where "orderId" = $1`,
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
        SELECT id, "productId", "orderId", price, quantity, name, description
        FROM order_products op
        JOIN products p on op."productId" = p.id
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
                FROM orders
                `
        );

        //get products
        const { rows: products } = await client.query(
            `
                SELECT *
                FROM order_products op
                JOIN products p on op."productId" = p.id
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
                WHERE "userId" = $1
                `,
            [id]
        );
    } catch (error) {
        throw Error(error);
    }
}
