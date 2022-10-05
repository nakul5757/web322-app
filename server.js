/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name:     Nakul Mankoo       Student ID: 159486216       Date:    10-Oct-2022
*
*  Online (Heroku) Link: ________________________________________________________
*
********************************************************************************/ 



var dataSrv = require("./data-service.js");
var path = require("path");
var express = require("express");
var app = express();

var HTTP_PORT = process.env.PORT || 8080;
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(express.static('public'));

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"/views/home.html"));
  });

  app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname,"/views/about.html"));
  });



  app.get("/employees", function(req,res){
    dataSrv.getAllEmployees()
                             .then((data) => {
                               res.json(data);
                             })
                             .catch((err) => {
                               console.log(err);
                               res.json(err);
                             })
  });
 

  app.get("/managers", function(req,res){
    dataSrv.getManagers()
                             .then((data) => {
                               res.json(data);
                             })
                             .catch((err) => {
                               console.log(err);
                               res.json(err);
                             })
  });


  app.get("/departments", function(req,res){
   
   dataSrv.getDepartments()
                           .then((data) => {
                               res.json(data);
                           })
                           .catch((err) => {
                               console.log(err);
                               res.json(err);
                           })
  });


  app.use(function (req, res) {
    res.status(404).sendFile(path.join(__dirname,"/views/error404.html"));
  })

  
  dataSrv.initialize()
                      .then(() => {
                            app.listen(HTTP_PORT, onHttpStart);  
                      })
                      .catch(err => {
                            console.log(err);
                      })
