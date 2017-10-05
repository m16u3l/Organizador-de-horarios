var express = require('express');
var app = express();

app.use(express.static('public'));
app.set("view engine","jade");

app.use(require('./routes/Main.js'));

app.listen(8080, function () {
    console.log("starting");
});
