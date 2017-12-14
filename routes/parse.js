var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var multer = require('multer');
var uploader = multer({dest: "./uploads"}); 
//var middleware_upload = uploader.single('file_input');

var mongoose = require('mongoose');
var PDFJS = require('pdfjs-dist');
var fs = require('fs');

router.post("/parse",uploader.single('file_input'),function(solicitud,respuesta){
    
    //var my_path = '134111.pdf';
    var my_path = solicitud.file.path;

    var data = new Uint8Array(fs.readFileSync(my_path));
    
    PDFJS.getDocument(data).then(function (pdf) {
        var pdfDocument = pdf;
        var pagesPromises = [];
    
        for (var i = 0; i < pdf.pdfInfo.numPages; i++) {
            (function (pageNumber) {
                pagesPromises.push(getPageText(pageNumber, pdfDocument));
            })(i + 1);
        }
    
        Promise.all(pagesPromises).then(function (pagesText) {
            
            // Render text
            for(var i = 0;i < pagesText.length;i++){
             console.log(pagesText[i]);
              //$("#pdf-text").append("<div><h3>Page "+ (i + 1) +"</h3><p>"+pagesText[i]+"</p><br></div>")
            }
            
        });

        //var json = parsear(pagesPromises);
    
    }, function (reason) {
        // PDF loading error
        console.error(reason);
    });
    //respuesta.render("inicio.jade");
});

function getPageText(pageNum, PDFDocumentInstance) {
    // Return a Promise that is solved once the text of the page is retrieven
    return new Promise(function (resolve, reject) {
        PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
            // The main trick to obtain the text of the PDF page, use the getTextContent method
            pdfPage.getTextContent().then(function (textContent) {
                var textItems = textContent.items;
                var finalString = "";

                // Concatenate the string of the item to the final string
                for (var i = 0; i < textItems.length; i++) {
                    var item = textItems[i];

                    finalString += item.str + "\n";
                }

                // Solve promise with the text retrieven from the page
                resolve(finalString);
            });
        });
    });
}



module.exports = router;