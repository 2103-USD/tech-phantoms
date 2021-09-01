// Requires
const client = require("./client");

//get product by id
async function getProductById(id) {
    try {
        const {
            rows: [product],
        } = await client.query(
            `
      SELECT *
      FROM products
      WHERE id = $1;
      `,
            [id]
        );
        return product;
    } catch (error) {
        throw Error(error);
    }
}

async function getAllProducts() {
    try {
        const { rows: products } = await client.query(
            `
      SELECT *
      FROM products;
      `
        );
        return products;
    } catch (error) {
        throw Error(error);
    }
}

async function createProduct({
    name,
    description,
    price,
    imageURL,
    inStock,
    category,
}) {
    try {
        const {
            rows: [product],
        } = await client.query(
            `
      INSERT INTO products (name, description, price, "imageURL", "inStock", category)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
      `,
            [name, description, price, imageURL, inStock, category]
        );
        return product;
    } catch (error) {
        throw Error(error);
    }
}

//Destroy a product
async function destroyProduct({ id }) {
    try {
        const {
            rows: [product],
        } = await client.query(
            `
            DELETE FROM products
            WHERE id = $1
              AND id NOT IN (
                SELECT "productId"
                FROM order_products
                WHERE status <> 'completed'
              )
            RETURNING *;   
            `,
            [id]
        );

        //If the product was deleted, delete order_products
        if (product) {
            const {
                rows: [orderProducts],
            } = await client.query(
                `
                DELETE FROM order_products
                WHERE "productId" = $1;
                `,
                [id]
            );
        }

        return product;
    } catch (error) {
        throw error;
    }
}

//update product details
async function updateProduct(product) {
    const { id, name, description, price, imageURL, inStock, category } =
        product;
    try {
        const {
            rows: [product],
        } = await client.query(
            `
            UPDATE PRODUCTS
            SET name = $2, description = $3, price = $4, "imageURL" = $5,
                "inStock" = $6, category = $7
            WHERE id = $1
            RETURNING *;
            `,
            [id, name, description, price, imageURL, inStock, category]
        );
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getProductById,
    getAllProducts,
    createProduct,
    destroyProduct,
    updateProduct,
};
