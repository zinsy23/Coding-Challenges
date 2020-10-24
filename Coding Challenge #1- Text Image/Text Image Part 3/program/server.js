var express = require('express');

var app = express();
var server = app.listen(8001);

app.use(express.static('public'));

console.log("My socket server is running");
