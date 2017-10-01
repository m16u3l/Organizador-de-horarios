var express = require('express');
var app = express();

var path = require('path');

app.get('/', function (req, res) {
    res.render('index.jade');
});

//iniciar html
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

//iniciar angular
app.use('/angular', express.static(path.join(__dirname, 'node_modules', 'angular')));

app.listen(8080, function () {
  console.log("starting");
});