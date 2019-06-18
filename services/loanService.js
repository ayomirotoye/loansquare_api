var Datastore = require('nedb');
// var userLoanDb = new Datastore();

function getLoan(loanDb, reqId){
    return new Promise( function (resolve, reject) {
        loanDb.find({loanId: reqId}, function (err, docs) {
            if (err) {
                reject(err);
            }else{
                resolve(docs);
            }
        });
    });
}

function getLoans(loanDb){
    return new Promise( function (resolve, reject) {
        loanDb.find({}, function (err, docs) {
            if (err) {
                reject(err);
            }else{
                resolve(docs);
            }
        });
    });    
}

function createNewLoan(loanDb, newLoanDetails){
    return new Promise( function (resolve, reject) {
        loanDb.insert(newLoanDetails, function (err, docs) {
            if (err) {
                reject(err);
            }else{
                resolve(docs);
            }
        });
    }); 
}

function removeLoan(loanDb, reqId){
    return new Promise( function (resolve, reject) {
        loanDb.remove({loanId: reqId}, function (err, numRemoved) {
            if (err) {
                reject(err);
            }else{
                resolve(numRemoved);
            }
        });
    });  
}

function updateLoan(loanDb, newLoanDetails, reqId){
    return new Promise( function (resolve, reject) {
        console.log(newLoanDetails);
        console.log("reqId", reqId);
        loanDb.update({loanId: reqId }, { $set: newLoanDetails }, {}, function (err, numReplaced) {
            if (err) {
                reject(err);
            }else{
                resolve(numReplaced);
            }
        });
    });  
}

// function provideLoanToUser(loanDb, newLoanDetails){
//     var reqUserId = newLoanDetails.userId;

//     return new Promise( function (resolve, reject) {
//         userLoanDb.find({userId: reqUserId}, function (err, docs) {
//             if (err) {
//                 reject(err);
//             }else if(docs.length == 0){
//                 userLoanDb.insert(newLoanDetails, function (err, docs) {
//                     if (err) {
//                         reject(err);
//                     }else{
//                         console.log("userLoan has been created");
//                         resolve(docs);
//                     }
//                 });
//             }
//         });
//     });  
// }


module.exports.getLoan = getLoan;
module.exports.getLoans =  getLoans;
module.exports.removeLoan =  removeLoan;
module.exports.createNewLoan =  createNewLoan;
module.exports.updateLoan =  updateLoan;
// module.exports.provideLoanToUser =  provideLoanToUser;