require('dotenv').config();
const express = require('express');
const authenticationRouter = express.Router();
const jwt = require('jsonwebtoken');

const apiUser = process.env.API_USERNAME;
const apiPassword = process.env.API_PASSWORD;
const apiSecret = process.env.API_SECRET;

console.log(apiUser);
console.log(apiPassword);
authenticationRouter.post('/', (req, res) => {
    if (req.body.username == apiUser && req.body.password == apiPassword) {
        console.log(req.body.username);
        console.log(req.body.password);
        const payload = {
            check: true
        };
        var token = jwt.sign(payload, apiSecret, {
            expiresIn: 1440 // expires in 24 hours
        });

        res.json({
            message: 'authentication created ',
            token: token
        });
    } else {
        res.json({ message: "Oops! user credential not valid!" })
    }

});

module.exports = authenticationRouter;