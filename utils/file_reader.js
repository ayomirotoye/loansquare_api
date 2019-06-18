const fs = require('fs');

function readFromFile(filePath){
    return new Promise( function (resolve, reject) {
        fs.readFile(filePath,'utf8', (err, data) => {
            if (err) {
                reject(err);
            }else{
                resolve(JSON.parse(data));
            }
         });
    });
}

function writeToFile(objecToWrite, filePath){
    return new Promise( function (resolve, reject) {
        fs.writeFile(filePath,'utf8', (err, data) => {
            if (err) {
                reject(err);
            }else{
                resolve(JSON.parse(data));
            }
         });
    });
}
module.exports.readFromFile = readFromFile;
module.exports.writeToFile = writeToFile;