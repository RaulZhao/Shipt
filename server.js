// const http = require("http");
const express = require('express');
const app = express();
const api_proxy = require('./routes');

const HTTP_PORT = 8888;

function start() {
  app.set('views', './views');
  app.set('view engine', 'ejs');
  app.set('title', 'Raul API Server');

  app.use((req, res, next) => {
    console.log("Time: ", Date());
    res.set("X-Frame_Options", "SAMEORIGIN");
    next();
  });

  app.use('/api', api_proxy);
  app.get('/', (req, res, next) => {
    res.render("index", {"name": "Raul"});
  });

  app.use((err, req, res, next) => {
    err.status = 621;
    res.render('error', {
      "message": JSON.stringify(err)
    });
    console.log("!!!!!! Error: ", err);
  });

  app.use((req, res, next) => {
    res.status(404);
    res.render('error', {
      "message": "The page you are trying to access is not available"
    });
    console.log("!!!!!! 404 Error ");
  });

  app.listen(HTTP_PORT);
  console.log("**** Server is started on port " + HTTP_PORT);
}

exports.start = start;
