const express = require('express');
const fs = require('fs');
const app = express();  
const csv = require("csvtojson");  //handles the CSV to json https://www.npmjs.com/package/csvtojson


var logrotate = require('logrotator'); //log rotating packet. //Rotates logs with the parameteres on line 9. More info at https://github.com/capriza/logrotator
var rotator = logrotate.rotator;
rotator.register('/Users/henryfrank/Desktop/code/node-101/node101-log-all-the-things/tmp/log.csv', {schedule: '5m', size: '10m', count: 10});
rotator.on('error', function(err) {
  console.log('oops, an error occured!');
});
// 'rotate' event is invoked whenever a registered file gets rotated
rotator.on('rotate', function(file) {
  console.log('file ' + file + ' was rotated!');
});


// const output = fs.createWriteStream('./stdout.log');
// const errorOutput = fs.createWriteStream('./stderr.log');
// // Custom simple logger
// const { Console } = require('console');
// const logger = new Console({ stdout: output, stderr: errorOutput });
// use it like console but with logger.log() and it outputs into it's own stdout.log file. SUPER SUPER USEFUL!!


var initialData = [];

app.use((req, res, next) => {
// write your logging code here

//Getting the User Agent and pushing it into the initialData array
var getUserData = req.get("User-agent"); //getting user agent info
var dataAsString = '"' + getUserData + '"'; //wrapping that user-agent data in ' ' to make it a string itself and ignore the ,'s so that the ,'s don't create a new item in the csv fiels. 
initialData.push(dataAsString);

// logger.log(dataMinusTheComma);

//Get Time in IOS format, 
var time = new Date();
var timeFormatted = time.toISOString();
initialData.push(timeFormatted);
// logger.log(timeFormatted);

//Get Method
var methodType = req.method;
initialData.push(methodType);

// logger.log(methodType);
//Get resource
var pathAndFile = req.url;
initialData.push(pathAndFile);

// logger.log(pathAndFile);
//Get version
var version = 'HTTP/' + req.httpVersion; 
initialData.push(version);

// logger.log(version);
//Get Status
var status = res.statusCode;
initialData.push(status);

// logger.log(status);

var makeArrayStr = initialData.join(","); //array.join(seperator); takes an array, makes the contens a string with wahtever is in () as the seperator.
var stringWithLineBreak = makeArrayStr + "\n"; //making a new var that is the array string joined with ,'s now with a \n to be a line break in the csv file. 
// logger.log(makeArrayStr);
// logger.log(stringWithLineBreak);

console.log(makeArrayStr); //logging each server request to the console. 

fs.appendFile("log.csv", stringWithLineBreak, (err) => {   //This is adding the whole bunch of stuff to the CSV file. if err throw err part is just fs syntax. 
    if (err) throw err;
    console.log("The info has been added to the CSV file");
// logger.log(stringWithLineBreak);

//This is emtying the array that holds all the vars after each pass through(each refresh fo the page in browser) so that with each refresh its now
//appending all the info + the info from last time, + the info form the last two times etc... 
function emptyArray() {
    initialData.length = 0;
}
emptyArray();
})

next(); //don't forget this next in all app.use sections, without it the JS thread will never move on. Not necessary in all app.get's?
});

app.get('/', (req, res) => {
// write your code to respond "ok" here
 res.status(200).send("Ok");
});

app.get('/logs', (req, res) => {
// using the packet csvToJson above to handle this, the below is their syntax. Link to doc's above. 
const csvFilePath = '/Users/henryfrank/Desktop/code/node-101/node101-log-all-the-things/tmp/log.csv';
csv()
    .fromFile(csvFilePath)
    .then(function(jsonArrayObj) {
        console.log(jsonArrayObj);
        // logger.log(jsonArrayObj);
        res.status(200).send(jsonArrayObj);
    })
});



module.exports = app;