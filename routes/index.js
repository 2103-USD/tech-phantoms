const apiRouter = require('express').Router();

apiRouter.get("/", (req, res, next) => {
    res.status(418);
    res.send({
        message: "API is under construction!"
    });
});

module.exports = apiRouter;
