// Requires
const express = require('express');
const {
    getOrderById,
    getOrderProductById,
    getReviewById
} = require('../db');


function requireUser(req, res, next) {
    if (!req.user) {
        res.status(401)
        next({
            name: "NotLoggedIn",
            message: "You must log in first."
        });
    }
    next();
}

async function requireAdmin(req, res, next) {
    if (!req.user) {
        res.status(401)
        next({
            name: "NotLoggedIn",
            message: "You must log in first."
        });
    }
    const _user = await getUserById(id); 
    if (!_user.isAdmin){
        res.status(403)
        next({
            name: "AdminLoginRequired",
            message: "Only admins are allowed to perform this function."
        });       
    }
    next();
}

async function verifyUserIsOrderOwner(req, res, next) {
    try {
        if (!req.user) {
            res.status(401)
            next({
                name: "NotLoggedIn",
                message: "You must log in first."
            });
        }

        const {orderId} = req.params
        const {id:UserId} = req.user;
        const order = await getOrderById(orderId);
        if (order) {
            //Check if user is order owner
            if (order.userId == UserId) {
                next();
            }
            else {
                res.status(403)
                next({
                    name:"NotYourOrder",
                    message:"This is not your order."
                })
            }
        }
        else {
            res.status(404)
            next({
                name:"OrderNotFound",
                message:"The order was not found."
            })
        }
    } catch ({ name, message }) {
        next({
            name:"OrderOwnerVerificationError",
            message:"Unable to determine if user is current owner of this order."
        })      
    }
    next();
}

async function verifyUserIsOrderProductOwner(req, res, next) {
    try {
        if (!req.user) {
            res.status(401)
            next({
                name: "NotLoggedIn",
                message: "You must log in first."
            });
        }

        const {orderProductId} = req.params
        const orderProduct = await getOrderProductById(orderProductId)
        if (orderProduct) {
            const {id:UserId} = req.user;
            const order = await getOrderById(orderId);
            if (order) {
                //Check if user is order owner
                if (order.userId == UserId) {
                    next();
                }
                else {
                    res.status(403)
                    next({
                        name:"NotYourOrder",
                        message:"This is not your order."
                    })
                }
            }
            else {
                res.status(404)
                next({
                    name:"OrderNotFound",
                    message:"The order was not found."
                })
            }
        }
        else {
            next({
                name:"OrderProductNotFound",
                message:"The product item was not found."
            })
        }
    } catch ({ name, message }) {
        next({
            name:"OrderOwnerVerificationError",
            message:"Unable to determine if user is current owner of this order."
        })      
    }
    next();
}

async function verifyUserIsReviewOwner(req, res, next) {
    try {
        if (!req.user) {
            res.status(401)
            next({
                name: "NotLoggedIn",
                message: "You must log in first."
            });
        }

        const {reviewId} = req.params
        const {id:UserId} = req.user;
        const review = await getReviewById(reviewId);
        if (order) {
            //Check if user is order owner
            if (review.userId == UserId) {
                next();
            }
            else {
                res.status(403)
                next({
                    name:"NotYourReview",
                    message:"This is not your review."
                })
            }
        }
        else {
            res.status(404)
            next({
                name:"ReviewNotFound",
                message:"The review was not found."
            })
        }
    } catch ({ name, message }) {
        next({
            name:"ReviewOwnerVerificationError",
            message:"Unable to determine if user is current owner of this review."
        })      
    }
    next();
}

module.exports = {
    requireUser,
    requireAdmin,
    verifyUserIsOrderOwner,
    verifyUserIsOrderProductOwner,
    verifyUserIsReviewOwner
};