var express = require('express');
var http = require('http');
var app = express();
var portx = process.env.PORT;  // This is my addition
app.get('/', function (req, res) {
  res.send('Hello World!')
})
app.set("port", portx);  // to here
app.listen(app.get("port"), function () {
  console.log('Example app listening on port '+app.get("port")+'!')
})
