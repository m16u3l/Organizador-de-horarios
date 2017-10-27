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
	codigo : String,
	niveles : Array
};
var Carrera = mongoose.model("Carrera",carreraSchema);


// Get - parse

router.get('/carrera',function(req,res) {
	var parametros = [];
	var id_carrera;
	if(req.url.indexOf("?")){
		var url_data = req.url.split("?");
		var parametros = url_data[1].split("&");
		var valores = parametros[0].split("=");
		id_carrera = valores[1];
	}
	Carrera.findById(id_carrera,function(err,docs){
		if (err) {
			console.log(error);
		}else{
			res.render('contenido-creacion-tabla.jade', {carrera:docs});
		}
	});
});


module.exports = router;