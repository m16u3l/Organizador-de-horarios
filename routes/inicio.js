var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var promise = mongoose.connect('mongodb://localhost/organizadoraHorarios', {
	useMongoClient: true,
  });

var router = express();

var Carrera = mongoose.model('Carrera');

router.get('/',function(req,res) {
	Carrera.find(function (error,documento) {
		if (error) {
			console.log(error);
		}else{
			
			var primerResultado = documento;
			
		
			res.render('inicio.jade', {carrera: primerResultado});

		}
	});
});


module.exports = router;