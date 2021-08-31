// Requires
const client = require('./client');

//get product by id
async function getReviewsByProductId(id) {
    try {
        const {
            rows: [product],
        } = await client.query(
            `
                SELECT *
                FROM reviews
                WHERE "productId" = $1;
            `,
            [id]
        );
        return product;
    } catch (error) {
        throw error;
    }
}


async function createReview({ 
    productId, 
    title, 
    content, 
    stars, 
    userId 
}) {
    try {
        const {
            rows: review,
        } = await client.query(
            `
                INSERT INTO reviews (title, content, stars, "userId", "productId")
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *;
            `,
            [ title, content, stars, userId, productId ]
        );
        return review;
    } catch (error) {
        throw error;
    }
}

async function updateReview({ 
    id,
    productId, 
    title, 
    content, 
    stars, 
    userId 
}) {
    try {
        const {
            rows: review,
        } = await client.query(
            `
                UPDATE reviews 
                SET title=$2, content = $3, stars = $4
                WHERE id = $1
                RETURNING *;
            `,
            [ id, title, content, stars ]
        );
        return review;
    } catch (error) {
        throw error;
    }
}

async function deleteReview(id) {
    try {
        const {
            rows: [review],
        } = await client.query(
            `
                DELETE
                FROM reviews
                WHERE id = $1
                RETURNING *;
            `,
            [id]
        );
        return product;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getReviewsByProductId,
    createReview,
    updateReview,
    deleteReview,
};
