"use strict";
var cors = require('cors');
var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var app = express();
var port = 5000;
var uri = "mongodb+srv://xbd888:clastic@clastic-cluster.odxz5.mongodb.net/Clastic?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
var connection = mongoose.connection;
connection.on("open", function () {
    console.log("Connected to mongodb!");
});
app.listen(port, function () { return console.log("server is running"); });
//# sourceMappingURL=server.js.map