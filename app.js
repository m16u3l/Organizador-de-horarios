var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.set("view engine","jade");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var uploader = multer({dest: "./uploads"}); 
var middleware_upload = uploader.single('file_input');

app.use(require('./routes/principal.js'));
app.use(require('./routes/inicio.js'));
app.use(require('./routes/parse.js'));

app.listen(8080, function () {
    console.log("starting");
});
