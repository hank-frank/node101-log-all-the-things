const express = require('express');
const fs = require('fs');
const app = express();


var initialData = [];

app.use((req, res, next) => {
// write your logging code here

//Getting the User Agent and pushing it into the initialData array
var getUserData = req.get("User-agent");
initialData.push(getUserData);

//Get Time in IOS format, 
var time = new Date();
var ISOTime = time.toISOString();
initialData.push(ISOTime);

//Get Method
var methodType = req.method;
initialData.push(methodType);

//Get resource
var pathAndFile = req.url;
initialData.push(pathAndFile);

//Get version
var version = req.httpVersion; 
initialData.push(version);

//Get Status
var status = req.statusCode;
initialData.push(status);

var makeArrayStr = initialData.join(","); //array.join(seperator); takes an array, makes the contens a string with wahtever is in () as the seperator.
var newLine = 

fs.appendFile("log.csv", makeArrayStr)
});




app.get('/', (req, res) => {
// write your code to respond "ok" here
 res.status(200).send("Ok");
});

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here

});

module.exports = app;



// var ua = navigator.userAgent;
// console.log(ua);
// // var source = req.headers['user-agent'],
// //   ua = useragent.parse(source);
// //   console.log(source);
// //   console.log(ua);
// });