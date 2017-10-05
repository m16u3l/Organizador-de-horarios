
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/organizadoraHorarios");

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
		if (error) {console.log(error);}
		var newArray = JSON.stringify(documento);
		var regex = new RegExp("\"", "g");
		var resi = newArray.replace(regex, "'");
		res.render('index.jade',{lista:resi});
	});
});

module.exports = router;