const express = require('express');
const fs = require('fs');
const app = express();  
const csv = require("csvtojson"); 

var initialData = [];

app.use((req, res, next) => {
var getUserData = req.get("User-agent"); 
var dataAsString = '"' + getUserData + '"'; 
initialData.push(dataAsString);

var time = new Date();
var timeFormatted = time.toISOString();
initialData.push(timeFormatted);

var methodType = req.method;
initialData.push(methodType);

var pathAndFile = req.url;
initialData.push(pathAndFile);

var version = 'HTTP/' + req.httpVersion; 
initialData.push(version);

var status = res.statusCode;
initialData.push(status);

var makeArrayStr = initialData.join(","); 
var stringWithLineBreak = makeArrayStr + "\n"; 
fs.appendFile("/tmp/log.csv", stringWithLineBreak, (err) => {
    if (err) throw err;
    function emptyArray() {
         initialData.length = 0;
    }
    emptyArray();
    })
    next();
});

app.get('/', (req, res) => {
 res.status(200).send("Ok");
});

app.get('/logs', (req, res) => {
const csvFilePath = '/Users/henryfrank/Desktop/code/node-101/node101-log-all-the-things/tmp/log.csv';
csv()
    .fromFile(csvFilePath)
    .then(function(jsonArrayObj) {
        res.status(200).send(jsonArrayObj);
    })
});

module.exports = app;
