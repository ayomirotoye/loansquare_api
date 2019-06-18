const express = require('express');
const loanRouter = express.Router();
var stringUtils = require('../utils/stringUtils');
var Datastore = require('nedb');
var loanDb = new Datastore();
var loanService = require('../services/loanService');

//Initialise the loan details in embedded memory
var loans = [];

var loanId = stringUtils.randomString();
var loanDetails_1 = {
    "loanId": loanId,
    "name": "Ren money",
    "description": "Salary earners discounted loan",
    "interestRate": 3,
    "amount": 50000,
    "tenure": 18
};
loanId = stringUtils.randomString();
var loanDetails_2 = {
    "loanId": loanId,
    "name": "kia kia",
    "description": "Easy small loans",
    "interestRate": 5,
    "amount": 5000,
    "tenure": 3
};

loans.push(loanDetails_1, loanDetails_2);

loanDb.insert(loans, function (err, docs) {
    docs.forEach(function (d) {
        console.log('Saved loans:', d.name);
    });
});


//Get all loans
loanRouter.get('/', async (req, res) => {
    try {
        loanService.getLoans(loanDb).then((result) => {
            if (result != null) {
                res.json(result);
            } else {
                res.status(404).json({ "message": "no loans available" });
            }
        }, function (err) {
            res.status(500).json({ "message": err.message });
        });
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
});

//Get loan by id
loanRouter.get('/:id', async (req, res) => {
    var loanId = req.params.id;
    try {
        loanService.getLoan(loanDb, loanId).then((result) => {
            if (result != null) {
                res.json(result);
            } else {
                res.status(404).json({ "message": "no loans with this id" });
            }
        }, function (err) {
            res.status(500).json({ "message": err.message });
        });
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
});

//Creating loan detail
loanRouter.post('/', async (req, res) => {
    try {
        var loanDetails = req.body;
        loanDetails.loanId = stringUtils.randomString();
        loanService.createNewLoan(loanDb, loanDetails).then((result) => {
            res.json(result);
        }, function (err) {
            res.status(404).json({ "message": err.message })
        });
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
});

//Update loans details
loanRouter.put('/:id', async (req, res) => {
    try {
        var loanDetails = req.body;
        // console.log(loanDetails);
        loanService.updateLoan(loanDb, loanDetails, loanId).then((result) => {
            if (parseInt(result) != null && parseInt(result) == 1) {
                res.status(200).json({ "responseCode": "00", "message": "loan successfully updated" });
            } else {
                res.status(404).json({ "message": "unable to update loan" });
            }
        }, function (err) {
            res.status(404).json({ "message": err.message })
        });
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
});

//Deleting loans by id
loanRouter.delete('/:id', async (req, res) => {
    var loanId = req.params.id;
    try {
        loanService.removeLoan(loanDb, loanId).then((result) => {
            if (parseInt(result) != null && parseInt(result) == 1) {
                res.status(200).json({ "responseCode": "00", "message": "loan successfully removed" });
            } else {
                res.status(404).json({ "message": "unable to remove loan" });
            }
        }, function (err) {
            res.status(500).json({ "message": err.message });
        });
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
});


// loanRouter.post('/apply/1', (req, res, next)=>{
//     var loanDetails = req.body;
//     try {
//         loanService.provideLoanToUser(loanDb, loanDetails).then((result) => {
//             res.send("");
//         }, function (err) {
//             res.status(500).json({ "message": err.message });
//         });
//     } catch (err) {
//         res.status(500).json({ "message": err.message })
//     }
// });

// loanRouter.get('/:userId/users', (req, res, next)=>{
//     var userId = req.params.userId;
//     try {
//         loanService.getLoanByUserId(userLoanDb, userId).then((result) => {
//             res.send("");
//         }, function (err) {
//             res.status(500).json({ "message": err.message });
//         });
//     } catch (err) {
//         res.status(500).json({ "message": err.message })
//     }
// });

module.exports = loanRouter;