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
