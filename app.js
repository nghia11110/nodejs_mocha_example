var express = require("express");
var app = express();

var controller = require("./controllers/welcome");

app.use('/',controller);

app.listen(3333, function () {
console.log("Server started")
});