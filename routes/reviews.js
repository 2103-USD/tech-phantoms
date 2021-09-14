// Requires
const express = require('express');
const {
    getReviewsByProductId,
    createReview,
    updateReview,
    deleteReview
} = require('../db');
const {
    requireUser, 
    verifyUserIsReviewOwner
} = require('./utils')

// Declarations
const reviewsRouter = express.Router();

// GUEST: Get reviews for an item
reviewsRouter.get('/:productId', async (req, res, next) => {
    const {productId} = req.params
    try {
        const reviews = await getReviewsByProductId(productId)
        if (reviews) {
            res.send(reviews)
        }
        else {
            res.status(404)
            next({
                name: "ReviewNotFound",
                message: "The selected product does not have any reviews at this time."
            })
        }
    } catch ({name, message}) {
        next({ name, message })
    }
});

// USER: Add a review for an item.
reviewsRouter.post('/:productId', requireUser, async (req, res, next) => {
    try {
        const {
            title,
            content,
            stars,
            userId
        } = req.body
        const {productId} = req.params
        const review = await createReview({ productId, title, content, stars, userId })
        if (review) {
            res.send(review)
        }
        else {
            next({
                name: "ReviewNotLeft",
                message: "The item was not able to be reviewed at this time."
            })
        }
    } catch ({name, message}) {
        next({ name, message })
    }
})

// USER: Update a review the user has published
reviewsRouter.patch('/:productId', verifyUserIsReviewOwner, async (req, res, next) => {
    try {
        const {
            id,
            title,
            content,
            stars,
            userId
        } = req.body
        const {productId} = req.params
        const review = await updateReview({ id, productId, title, content, stars, userId })
        if (review) {
            res.send(review)
        }
        else {
            next({
                name: "ReviewNotLeft",
                message: "The review was not able to be updated at this time."
            })
        }
    } catch ({name, message}) {
        next({ name, message })
    }
})

// USER: Delete a review the user has published
reviewsRouter.delete('/:reviewId', verifyUserIsReviewOwner , async (req, res, next) => {
    const {reviewId} = req.params
    try {
        const review = await deleteReview({reviewId})
        if (review) {
            res.send(review)
        }
        else {
            next({
                name: "ReviewNotFound",
                message: "The review was not found and cannot be deleted."
            })
        }
    } catch ({name, message}) {
        next({ name, message })
    }
});

module.exports = reviewsRouter