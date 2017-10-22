var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var promise = mongoose.connect('mongodb://localhost/organizadoraHorarios', {
	useMongoClient: true,
  });

var router = express();

// horario
var horarioSchema = {
	dia: String,
    hora: String,
    aula: Number
};
var Horario = mongoose.model("Horario",horarioSchema);
// grupo
var grupoSchema = {
	nombre : Number,
	docente : String,
	horarios : Array
};
var Grupo = mongoose.model("Grupo",grupoSchema);
// materia
var materiaSchema = {
	nombre : String,
	grupos : Array
};
var Materia = mongoose.model("Materia",materiaSchema);
// nivel
var nivelSchema = {
	nivel : String,
	materias : Array
};
var Nivel = mongoose.model("Nivel",nivelSchema);
//carrera
var carreraSchema = {
	nombre : String,
	niveles : Array
};
var Carrera = mongoose.model("Carrera",carreraSchema);


// Get - parse

router.get('/',function(req,res) {
	Carrera.find(function (error,documento) {
		if (error) {
			console.log(error);
		}else{
			//obteniendo el primer resultado de la consulta
			//aqui deberia darme solo 1 resultado
			//pero me da una lista, ya despues lo cambiaremos
			//por que debe ser 1 resultado o ninguno
			var primerResultado = documento[0];
			
			//aqui estamos enviando toda la carrera
			//podemos enviarle a jade un object sin hacer stringify
			res.render('contenido-creacion-tabla.jade', {carrera: primerResultado});

		}
	});
});


module.exports = router;