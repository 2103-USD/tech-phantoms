// Requires
const express = require('express');


function requireUser(req, res, next) {
    if (!req.user) {
        next({
            name: "Utils_MissingUserError",
            message: "You must be logged in to perform this action"
        });
    }
  
    next();
}
  
module.exports = {
    requireUser
};