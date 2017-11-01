const server = require("./server");
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/test");
mongoose.connection.on('error', function(error) {
    console.log(error);
});

server.start();
