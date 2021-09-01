// Requires
const client = require("./client");

//Get all reviews for product
async function getProductReviews(productId) {
    try {
        const { rows: productReviews } = await client.query(
            `
      SELECT *
      FROM reviews
      WHERE "productId" = $1
      `,
            [productId]
        );

        return prouductReviews;
    } catch (error) {
        throw error;
    }
}

//Crete product review
async function createReview({ title, content, stars, userId, productId }) {
    try {
        const {
            rows: [review],
        } = await client.query(
            `
            INSERT INTO reviews (title, content, stars, "userId", "productId")
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
            `
        );

        return review;
    } catch (error) {
        throw error;
    }
}

//Update product review
async function updateReview({ id, title, content, stars }) {
    try {
        const {
            rows: [review],
        } = await client.query(
            `
            UPDATE reviews
            SET title = $2, content = $3, stars = $4
            WHERE id = $1
            RETURNING *;
            `,
            [id, title, content, stars]
        );

        return review;
    } catch (error) {
        throw error;
    }
}

//Destroy product review
async function destroyReview(id) {
    try {
        const {
            rows: [review],
        } = await client.query(
            `
            DELETE FROM reviews
            WHERE id = $1
            RETURNING *;
            `,
            [id]
        );

        return review;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getProductReviews,
    createReview,
    updateReview,
    destroyReview,
};
