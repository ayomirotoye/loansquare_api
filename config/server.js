require('dotenv').config();
const express = require ('express');
const app = express();

app.use(express.json());

//import routers

const authenticationRouter = require('../routers/auth');
const rootRouter = require('../routers/index');
const loanApiRouter = require('../routers/loans');
const userApiRouter = require('../routers/users');
const userLoansApiRouter = require('../routers/userLoans');

const apiVersion = process.env.API_VERSION;

//Register routers
app.use('/api/auth/', authenticationRouter);
app.use('/'+apiVersion, rootRouter);
app.use('/'+apiVersion+'/loans/', loanApiRouter);
app.use('/'+apiVersion+'/users/', userApiRouter);
app.use('/'+apiVersion+'/user_loans', userLoansApiRouter);

app.listen(3002, () => console.log('server started'));

