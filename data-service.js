const fs = require("fs");
var employees = [];
var departments = [];

module.exports.initialize = function () {

    var promise = new Promise((resolve, reject) => {
       
        try {

            fs.readFile('./data/employees.json', (err, data) => {
                if (err) throw err;

                employees = JSON.parse(data);
            })

            fs.readFile('./data/departments.json', (err, data) => {
                if (err) throw err;

                departments = JSON.parse(data);
            })

        } catch (ex) {
                      reject("FAILURE.");
                     }
        resolve("INITIALIZE SUCCESS.");
    })

    return promise;
};

//getAllEmployees

module.exports.getAllEmployees = function () {

    var promise = new Promise((resolve, reject) => {
        
       if(employees.length === 0) {
        var err = "getAllEmployees() does not have any data.";
        reject({message: err});
       }  

    resolve (employees);
    })
    return promise;
};

//getManagers

module.exports.getManagers = function () {

    var lManagers = [];
    var promise = new Promise((resolve, reject) => {
      
       for (var i=0; i < employees.length; i++){
           if (employees[i].isManager == true) {
           lManagers.push(employees[i]);
           }
       }

       if(lManagers.length === 0) {
        var err = "getManagers() does not have any data.";
        reject({message: err});
       }  

    resolve (lManagers);
    })
    return promise;
};

//getDepartments

module.exports.getDepartments = function () {

    var promise = new Promise((resolve, reject) => {
        if(departments.length === 0) {
         var err = "getDepartments() does not have any data.";
         reject({message: err});
        }  
 
     resolve (departments);
     })
     return promise;
};