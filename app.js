var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

app.use(express.static('public'));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/cursos', function (req, res) {
    fs.readFile(path.join(__dirname,'cursos.json'),'utf8',function(err, cursos){
        if(err) {
            throw err;
        } else {
            res.json(JSON.parse(cursos));
        }
    });
});

app.listen(8080, function () {
    console.log("starting");
});