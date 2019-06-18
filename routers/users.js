const express = require('express');
const userRouter = express.Router();
var Datastore = require('nedb');
var userDb = new Datastore();
const stringUtils = require('../utils/stringUtils');
const userService = require('../services/userService');

//Initialise the user details in embedded memory
var users = [];
var userId = stringUtils.randomString();
var user_1 = {
    "userId": userId,
    "firstName": "Ayomide",
    "lastName": "Akinrotoye",
    "userName": "ayomirotoye@gmail.com",
    "phoneNumber": "08065057496",
    "password": "12345",
    "userRole": 1
};
userId = stringUtils.randomString();
var user_2 = {
    "userId": userId,
    "firstName": "Ade",
    "lastName": "Bisi",
    "userName": "adebisi@gmail.com",
    "phoneNumber": "08055400714",
    "password": "123456",
    "userRole": 1
};

users.push(user_1, user_2);

userDb.insert(users, function (err, docs) {
    docs.forEach(function (d) {
        console.log('Saved users:', d.firstName);
    });
});

//Get all users
userRouter.get('/', (req, res) => {
    try {
        userService.getUsers(userDb).then((result)=>{
            res.json(result);
        }, function(err){
            res.status(500).json({"message": err.message});
        });
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
});

//Get one user
userRouter.get('/:id', (req, res) => {
    try {
        userService.getUser(userDb, req.params.id).then((result)=>{
            res.json(result);
        }, function(err){
            res.status(200).json({"message": "user with this id not found"})
        });
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
});

//create one user
userRouter.post('/', (req, res) => {

    try {
        req.body.userId = stringUtils.randomString();
        userService.createNewUser(userDb, req.body).then((result)=>{
            res.json(req.body);
        }, function(err){
            res.status(404).json({"message": "user could not be created"})
        });
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
});

//create one user
userRouter.post('/login', (req, res) => {
    try {
        userService.userLogin(userDb, req.body).then((result)=>{
            console.log(req.body);
            if(result != null){
                res.status(200).json(result);
            }else{
                res.status(404).json({"responseCode": "01", "message": "invalid username/password"})
            }
        }, function(err){
            res.status(404).json({"responseCode": "02", "message": "invalid username/password"})
        });
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
});

module.exports = userRouter;