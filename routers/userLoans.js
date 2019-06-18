const express = require('express');
const userLoanRouter = express.Router();
var Datastore = require('nedb');
var userLoanDb = new Datastore();
var userLoanService = require('../services/userLoanService');
var dateUtil = require('../utils/dateUtils');

//Get all user loans
userLoanRouter.get('/', async (req, res) => {
    try {
        userLoanService.getUserLoan(userLoanDb).then((result) => {
            if (result != null) {
                res.json(result);
            } else {
                res.status(404).json({ "message": "no user loans available" });
            }
        }, function (err) {
            res.status(500).json({ "message": err.message });
        });
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
});

//Get loan by id
userLoanRouter.get('/:id', async (req, res) => {
    let userLoanDetails;
    try {
        const reqId = req.params.id;
        console.log(reqId);
        userLoanDb.findOne({ _id: reqId }, function (err, doc) {
            console.log(doc);
            if (!err && doc != null) {
                userLoanDetails = doc;
                res.status(200).json(userLoanDetails);
            } else {
                res.status(404).json({ "message": "loan not found" });
            }
        });
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
});

//Creating loan detail
userLoanRouter.post('/', (req, res, next) => {
    var loanDetails = req.body;

    let newLoanApplicationDate = loanDetails.applicationDate;

    var dateComparison = dateUtil.validateDate(newLoanApplicationDate);
    console.log("dATE COMPARISON:", dateComparison);

    if(!dateComparison ){
        res.status(400).json({ "responseCode": "02", "description": "invalid date"});
        return;
    }
    try {
        userLoanService.provideLoanToUser(userLoanDb, loanDetails).then((result) => {
            if(result.userLoanId != null){
                res.status(201).json(result);
            }else{
                res.status(500).json(result);
            }
        }, function (err) {
            res.status(500).json({ "message": err.message });
        });
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
});

//Update loans details
userLoanRouter.put('/:id', async (req, res) => {
    getLoanById(req.params.id).then((loanDetails) => {
        // console.log(loanDetails);
        res.status(200).json(loanDetails);
    }, function (err) {
        res.status(404).json({ "message": err.message })
    });
});

//Deleting loans by id
userLoanRouter.delete('/:id', async (req, res) => {
    const reqId = req.params.id;
    try {
        loanDb.remove({ _id: reqId }, {}, function (err, numRemoved) {
            if (!err && numRemoved == 1) {
                res.json({ message: "deleted loan successfully!" });
            } else {
                res.status(400).json({ "message": "unable to delete loan" });
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

module.exports = userLoanRouter;