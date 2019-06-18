require('dotenv').config();
const express = require('express');
const indexRouter = express.Router();
const jwt = require('jsonwebtoken');

const apiUser = process.env.API_USERNAME;
const apiPassword = process.env.API_PASSWORD;
const apiSecret = process.env.API_SECRET;

console.log(apiUser);
console.log(apiPassword);
indexRouter.use((req, res, next) => {
    // check header for the token
    var token = req.headers['access-token'];

    // decode token
    if (token) {
        // verifies secret and checks if the token is expired
        jwt.verify(token, apiSecret, (err, decoded) => {
            if (err) {
                return res.json({ message: 'invalid token' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token  
        res.send({
            message: 'No token provided.'
        });

    }
});


module.exports = indexRouter;