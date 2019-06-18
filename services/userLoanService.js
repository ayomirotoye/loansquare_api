var Datastore = require('nedb');
var dateUtil = require('../utils/dateUtils');
var stringUtils = require('../utils/stringUtils');

// var userLoanDb = new Datastore();
function getUserLoan(userLoanDb) {
    return new Promise(function (resolve, reject) {
        userLoanDb.find({}, function (err, docs) {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
    });
}

function provideLoanToUser(userLoanDb, newLoanDetails) {
    var reqUserId = newLoanDetails.userId;
    return new Promise(function (resolve, reject) {
        userLoanDb.find({ userId: reqUserId }, function (err, docs) {
            if (err) {
                reject(err);
            } else if (docs.length == 0) {
                newLoanDetails.userLoanId = stringUtils.randomString();
                userLoanDb.insert(newLoanDetails, function (err, docs) {
                    if (err) {
                        reject(err);
                    } else {
                        console.log("userLoansssssssss has been created");
                        console.log(newLoanDetails);
                        resolve(docs);
                    }
                });
            } else if (docs.length > 0) {
                var canUserApply = true;
                var countWhereDateIsLess = 0;
                for (let i = 0; i < docs.length; i++) {
                    console.log(">>>>>>>>>>>>>>!!!!!!!!!:", i);
                    currUserLoan = docs[i];
                    let existingLoanDate = currUserLoan.endDate;
                    let newLoanApplicationDate = newLoanDetails.applicationDate;

                    console.log("existing loan date:", existingLoanDate);
                    console.log("new loan date:", newLoanApplicationDate);

                    var dateComparison = dateUtil.compareDates(existingLoanDate, newLoanApplicationDate);
                    console.log("dATE COMPARISON:", dateComparison);
                    //If existing loan date is greater than new application Date
                    if (dateComparison == "1") {
                        canUserApply = false;
                        console.log("you have a current loan running");
                        // resolve(docs);
                    } else if (dateComparison == "2") {//if existing loan date is before application date
                        countWhereDateIsLess += 1;
                        console.log(">>>>>>>>>>application Date is greater her<<<<<<<<<<<<");
                        // resolve(docs);
                    } else if (dateComparison == "0") {// if existing loan date is equal to new application date
                        console.log("your loan expires todaypay up to be able to apply! ");
                        // resolve(docs);
                    } else {
                        console.log("Invalid dates");
                        // resolve(docs);
                    }
                }
                console.log("canuserApply", canUserApply);
                console.log("countWhereDateIsLess", countWhereDateIsLess);
                if (canUserApply) {
                    newLoanDetails.userLoanId = stringUtils.randomString();
                    userLoanDb.insert(newLoanDetails, function (err, docs) {
                        if (err) {
                            reject(err);
                        } else {
                            console.log("userLoan has been created");
                            console.log(newLoanDetails);
                            resolve(docs);
                        }
                    });
                } else{
                    var response = { "message": "your application is not successful"};
                    resolve(response);
                }
            }
        });
    });
}

module.exports.provideLoanToUser = provideLoanToUser;
module.exports.getUserLoan = getUserLoan;