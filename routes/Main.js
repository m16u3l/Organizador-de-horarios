var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/organizadoraHorarios");

var router = express();
var mat = [
	{
		"materia": "INGLES I",
		"docente": "CESPEDES GUIZADA MARIA BENITA",
		"grupo": 1,
		"horario": [
			{
				"dia": "LU",
				"hora": "815-945",
				"aula": "617"
			},
			{
				"dia": "VI",
				"hora": "815-945",
				"aula": "691D"
			}
		]
	},

	{
		"materia": "INTRODUCCION A LA PROGRAMACION",
		"docente": "BLANCO COCA LETICIO",
		"grupo": 2,
		"horario": [
			{
				"dia": "MA",
				"hora": "1715-1845",
				"aula": "617"
			},
			{
				"auxiliatura": "ALURRALDE SANCHEZ ANTONIO",
				"dia": "MI",
				"hora": "1715-1845",
				"aula": "691B"
			},
			{
				"dia": "JU",
				"hora": "1545-1715",
				"aula": "624"
			}
		]
	},
	{
		"materia": "INTRODUCCION A LA PROGRAMACION",
		"docente": "COSTAS JAUREGUI VLADIMIR ABEL",
		"grupo": 10,
		"horario": [
			{
				"dia": "MA",
				"hora": "945-1115",
				"aula": "692D"
			},
			{
				"dia": "JU",
				"hora": "945-1115",
				"aula": "693A"
			},
			{
				"auxiliatura": "AUXILIAR POR DESIGNAR",
				"dia": "JU",
				"hora": "1415-1545",
				"aula": "691B"
			}
		]
	},
	{
		"materia": "REDES DE COMPUTADORAS",
		"docente": "ORELLANA ARAOZ JORGE WALTER",
		"numero": 2,
		"horario": [
			{
				"dia": "LU",
				"hora": "945-1115",
				"aula": "691B"
			},
			{
				"dia": "MA",
				"hora": "945-1115",
				"aula": "691C"
			},
			{
				"dia": "VI",
				"hora": "815-945",
				"aula": "692B"
			}
		]
	},
	{
		"materia": "TALLER DE BASE DE DATOS",
		"docente": "FLORES SOLIZ JUAN MARCELO",
		"numero": 3,
		"horario": [
			{
				"dia": "LU",
				"hora": "645-815",
				"aula": "690B"
			},
			{
				"dia": "VI",
				"hora": "645-815",
				"aula": "690B"
			}
		]
	}
];
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
			res.render('index.jade', {carrera: primerResultado});


			//var regex = new RegExp("\"", "g");
			//var resi = newArray.replace(regex, "'");
			//res.render('index.jade',{lista:resi});
			//res.render('index.jade', {listaMaterias: mat});
		}
	});
});


module.exports = router;