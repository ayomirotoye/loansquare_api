
function getUser(userDb, id){
    return new Promise( function (resolve, reject) {
        userDb.find({userId: id}, function (err, docs) {
            if (err) {
                reject(err);
            }else{
                resolve(docs);
            }
        });
    });
}

function getUsers(userDb){
    return new Promise( function (resolve, reject) {
        userDb.find({}, function (err, docs) {
            if (err) {
                reject(err);
            }else{
                resolve(docs);
            }
        });
    });    
}

function createNewUser(userDb, newUserDetails){
    return new Promise( function (resolve, reject) {
        userDb.insert(newUserDetails, function (err, docs) {
            if (err) {
                reject(err);
            }else{
                resolve(docs);
            }
        });
    });  
}
// Delete user
function removeUser(userDb, userId){
    return new Promise( function (resolve, reject) {
        userDb.remove({}, function (err, docs) {
            if (err) {
                reject(err);
            }else{
                resolve(docs);
            }
        });
    });  
}
// user login
function userLogin(userDb, loginDetails){
    return new Promise( function (resolve, reject) {
        console.log("loginDetails", loginDetails);
        userDb.find(loginDetails, function (err, docs) {
            if (err) {
                reject(err);
            }else{
                console.log(docs);
                resolve(docs);
            }
        });
    });  
}

module.exports.getUser = getUser;
module.exports.getUsers =  getUsers;
module.exports.createNewUser =  createNewUser;
module.exports.removeUser =  removeUser;
module.exports.userLogin =  userLogin;
