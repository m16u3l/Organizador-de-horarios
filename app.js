var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.set("view engine","jade");

app.use(require('./routes/principal.js'));
app.use(require('./routes/inicio.js'));

app.listen(8080, function () {
    console.log("starting");
});
