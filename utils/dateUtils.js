//Compare dates: 0- equal date, 1- date1 after date 2, 2- date2 after date1
function compareDates(date1, date2) {
    let dateObj1;
    let dateObj2;

    dateObj1 = new Date(date1);
    dateObj2 = new Date(date2);

    console.log("dateObj1,",dateObj1);
    console.log("dateObj2,",dateObj2);
    if ((dateObj1.getTime() > dateObj2.getTime()) && (dateObj1 != "Invalid Date") && (dateObj2 != "Invalid Date")) {
        return "1";
    } else if ((dateObj1.getTime() < dateObj2.getTime()) && (dateObj1 != "Invalid Date") && (dateObj2 != "Invalid Date")) {
        return "2";
    }else if((dateObj1.getTime() == dateObj2.getTime()) && (dateObj1 != "Invalid Date") && (dateObj2 != "Invalid Date")){
        return "0";
    }else if((dateObj1 == "Invalid Date") || (dateObj2 == "Invalid Date")){
        return "-1";
    }
}

function validateDate(date1){
    let dateObj1 = new Date(date1);

    if((dateObj1 != "Invalid Date") && dateObj1 != null){
        return true;
    }else{
        return false;
    }
}
module.exports.compareDates = compareDates;
module.exports.validateDate = validateDate;