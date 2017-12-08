const server = require("./server");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shipt');
mongoose.connection.on('error', function(error) {
    console.log("**** mongodb connection error:", error);
});

server.start();
