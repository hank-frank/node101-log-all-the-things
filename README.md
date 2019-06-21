This is the Node101 Log All The Things Project. 

This is a Node.js based project which takes an incoming server request and 
responds to it with a json object full of the requesting users browser info. 

It does this by first grabing that info (The User Agent, Time, HTTP request Method, 
Resource resuested(the /route), HTTP Version, and the Status code of the response), 
and storing it in a CSV file. In this case log.csv. 

Then if a GET requests comes in 
to the /route /logs it sends back that data in the form of a json object. 

Included are the packets:
csvtojson -  https://www.npmjs.com/package/csvtojson
logrotator - https://github.com/capriza/logrotator
console - https://www.npmjs.com/package/console