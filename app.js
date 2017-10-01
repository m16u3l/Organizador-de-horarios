var express = require('express');
var app = express();

var path = require('path');

//iniciar html
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

//iniciar angular
app.use('/angular', express.static(path.join(__dirname, 'node_modules', 'angular')));

app.listen(8080, function () {
  console.log("starting");
});