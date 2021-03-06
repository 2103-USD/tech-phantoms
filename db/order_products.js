// Requires
const client = require("./client");

//Get order product by ID
async function getOrderProductById(id) {
    try {
        const { rows: orderProducts } = await client.query(
            `
            SELECT 
                u.username,
                u."firstName",
                u."lastName",
                u.email,
                o.*,
                op.*
            FROM order_products op
                JOIN orders o on op."orderId" = o.id
                JOIN users u on o."userId" = u.id
            WHERE op.id = $1
            `,
            [id]
        );
        return orderProducts;
    } catch (error) {
        throw error;
    }
}

//Add product to Order
async function addProductToOrder({ orderId, productId, price, quantity }) {
    try {
        const { rows: orderProduct } = await client.query(
            `
            INSERT INTO order_products ("orderId", "productId", price, quantity)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT ON CONSTRAINT idx_orderProducts
            DO UPDATE
            SET quantity = order_products.quantity + 1
            RETURNING *;
            `,
            [orderId, productId, price, quantity]
        );

        return orderProduct;
    } catch (error) {
        throw error;
    }
}

//update Order product
async function updateOrderProduct({ id, quantity }) {
    try {
        const { rows: orderProduct } = await client.query(
            `
            UPDATE order_products
            SET  quantity = $2
            WHERE id = $1
            RETURNING *;
            `,
            [id, quantity]
        );

        return orderProduct;
    } catch (error) {
        throw error;
    }
}

//destroy product from order
async function destroyOrderProduct(id) {
    try {
        const { rows: orderProduct } = await client.query(
            `
            DELETE FROM order_products
            where id = $1
            RETURNING *;
            `,
            [id]
        );
        return orderProduct;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getOrderProductById,
    addProductToOrder,
    updateOrderProduct,
    destroyOrderProduct,
};
