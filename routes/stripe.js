// Requires
const express = require('express');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const { STRIPE_SECRET }  = process.env;
const stripe = require('stripe')(STRIPE_SECRET)

const {
    requireUser
} = require('./utils')

// Declarations
const stripeRouter = express.Router();

// USER: Post a payment
stripeRouter.post('/pay', requireUser, async (req, res, next) => {
    const {total, token } = req.body
    try {

        console.log(STRIPE_SECRET)

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const idempotency_key = uuid();
        const charge = await stripe.charges.create({
            amount: total * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            // description: `Purchased ${product.name}`,
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
        idempotency_key
        }
        );

        console.log("Charge:", charge);
        res.status = "success";

        return charge

      } catch (error) {
        console.error("Error:", error);
        res.status = "failure";
      }
});


module.exports = stripeRouter