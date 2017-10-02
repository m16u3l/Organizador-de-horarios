var express = require('express');
var app = express();

app.use(express.static('public'));
app.set("view engine","jade");

app.get('/', function (req, res) {
    res.render('tablaHorario.jade');
});

app.listen(8080, function () {
    console.log("starting");
});
