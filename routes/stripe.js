// Requires
const express = require('express');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const { STRIPE_SECRET }  = process.env;
const stripe = require('stripe')(STRIPE_SECRET)
const uuid = require("uuid/v4");

const {
    requireUser
} = require('./utils')

// Declarations
const stripeRouter = express.Router();

// USER: Post a payment
stripeRouter.post('/pay', requireUser, async (req, res, next) => {
    try {
        const {total, token } = req.body

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const idempotencyKey = uuid();

        const charge = await stripe.charges.create({
            amount: total * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            }
        },
        {
            idempotencyKey
        }
        );

        res.send(charge)

      } catch (error) {
        console.error("Error:", error);
        res.status = "failure";
      }
});


module.exports = stripeRouter