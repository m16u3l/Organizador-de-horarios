var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var multer = require('multer');
var uploader = multer({ dest: "./uploads" });

var mongoose = require('mongoose');
var promise = mongoose.connect('mongodb://localhost/organizadoraHorarios', {
    useMongoClient: true,
});
var conn = mongoose.connection;

var PDFJS = require('pdfjs-dist');
var fs = require('fs');
var preprocesador = require("./preprocesamiento.js");

var carrera = mongoose.model('Carrera');

var contains = preprocesador.contains;
var getNivel = preprocesador.getNivel;

var validador = require("./validacion.js");
var checkNiveles = validador.checkNiveles;

router.post("/parse", uploader.single('file_input'), function (solicitud, res) {

    var my_path = solicitud.file.path;
    var data = new Uint8Array(fs.readFileSync(my_path));

    PDFJS.getDocument(data).then(function (pdf) {
        var pdfDocument = pdf;
        var pagesPromises = []; //list of promises

        var crearPromesa = function (pageNumber) {
            var textoPagina = getPageText(pageNumber, pdfDocument);
            pagesPromises.push(textoPagina);
        };

        for (var i = 0; i < pdf.pdfInfo.numPages; i++) {
            crearPromesa(i + 1);
        }

        Promise.all(pagesPromises).then(function (pagesText) {
            var horarioFinal = {}, nombreCarrera, facultad, gestion, fecha, semestres = [];
            try {
                for (var i = 0; i < pagesText.length; i++) {
                    var palabrasPagina = pagesText[i].split("\n");

                    if (i === 0) {
                        nombreCarrera = palabrasPagina.shift();

                        var nivel = palabrasPagina.shift();

                        facultad = palabrasPagina.shift();
                        gestion = palabrasPagina.shift();
                        fecha = palabrasPagina.pop();
                        fecha = palabrasPagina.pop();

                        palabrasPagina.unshift(nivel);
                    } else {
                        palabrasPagina.shift();
                        var nivel = palabrasPagina.shift();
                        palabrasPagina.shift();
                        palabrasPagina.shift();
                        palabrasPagina.pop();
                        palabrasPagina.pop();
                        palabrasPagina.unshift(nivel);
                    }
                    var jsonNivel = getNivel(palabrasPagina);
                    if (jsonNivel.nivel !== undefined) {
                        semestres.push(jsonNivel);
                    }
                }
                horarioFinal.nombre = nombreCarrera.split("(")[0];
                horarioFinal.codigo = nombreCarrera.split("(")[1].split(")")[0];
                horarioFinal.facultad = facultad.split("-")[0];
                horarioFinal.gestion = gestion.split(" ")[0];
                horarioFinal.anio = gestion.split(" ")[2];
                horarioFinal.fechaEmision = fecha;
                horarioFinal.niveles = semestres;
            
            } catch (err) {
                res.render("error-parser-PDF.jade");
            }

            conn.collection('carreras').insert(horarioFinal);
            //console.log(carrera);
            //console.log(horarioFinal);


            if (true) {
                res.render("vista-previa-carrera.jade");
            } else {
                res.render("error-parser-PDF.jade");
            }
        });



    }, function (reason) {
        res.render("error-parser-PDF.jade");
    });

});

function getPageText(pageNum, PDFDocumentInstance) {
    // Return a Promise that is solved once the text of the page is retrieven
    return new Promise(
        function (resolve, reject) {
            PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
                // The main trick to obtain the text of the PDF page, use the getTextContent method
                pdfPage.getTextContent().then(function (textContent) {
                    var textItems = textContent.items;
                    var finalString = "";
                    // Concatenate the string of the item to the final string
                    for (var i = 0; i < textItems.length; i++) {
                        var item = textItems[i];

                        if (!contains(item.str)) {
                            finalString += item.str + "\n";
                        }
                    }
                    // Solve promise with the text retrieven from the page
                    resolve(finalString);
                });
            });
        }
    );
}

module.exports = router;