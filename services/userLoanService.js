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
                    currUserLoan = docs[i];
                    let existingLoanDate = currUserLoan.endDate;
                    let newLoanApplicationDate = newLoanDetails.applicationDate;

                    var dateComparison = dateUtil.compareDates(existingLoanDate, newLoanApplicationDate);
                    //If existing loan date is greater than new application Date
                    if (dateComparison == "1") {
                        canUserApply = false;
                    } else if (dateComparison == "2") {//if existing loan date is before application date
                        countWhereDateIsLess += 1;
                    } else if (dateComparison == "0") {// if existing loan date is equal to new application date
                        console.log("your loan expires todaypay up to be able to apply! ");
                    } else {
                        console.log("Invalid dates");
                    }
                }
                if (canUserApply) {
                    newLoanDetails.userLoanId = stringUtils.randomString();
                    userLoanDb.insert(newLoanDetails, function (err, docs) {
                        if (err) {
                            reject(err);
                        } else {
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