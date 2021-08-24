const client = require("./index");

//get product by id
export async function getProductById(id) {
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

export async function getAllProducts() {
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

export async function createProduct({
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
