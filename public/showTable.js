var materiasPulsadas = [
	{
        "materia": "INGLES I",
        "idMateria": "123",
		"docente": "CESPEDES GUIZADA MARIA BENITA",
		"grupo": 1,
		"horario": [
			{
				"dia": "MA",
				"hora": "645-815",
				"aula": "617"
			},
			{
				"dia": "MI",
				"hora": "815-945",
				"aula": "691D"
			}
		]
	},

	{
        "materia": "INTRODUCCION A LA PROGRAMACION",
        "idMateria": "124",
		"docente": "BLANCO COCA LETICIO",
		"grupo": 2,
		"horario": [
			{
				"dia": "MA",
				"hora": "645-815",
				"aula": "691C"
			},
			{
				"auxiliatura": "ALURRALDE SANCHEZ ANTONIO",
				"dia": "MI",
				"hora": "1415-1545",
				"aula": "691B"
			},
			{
				"dia": "LU",
				"hora": "1415-1545",
				"aula": "624"
			}
		]
	}
];

var materiasAgregadas = [];

function simularAgregarMaterias() {
    for (materia of materiasPulsadas) {
        agregarMateria(materia);
    }
}

function agregarMateria(materiaInscrita) {
    
    var nombreMateria = materiaInscrita["materia"];
    var idMateria = "MAT"+materiaInscrita["idMateria"];
    var horario = materiaInscrita["horario"];

    for (clase of horario){
        //agrega dentro de la tabla
        crearWellNote(nombreMateria, idMateria,clase);
        //agrega en la lista de materias
        crearBanderaNote(nombreMateria,idMateria);
        //registra la materia internamente
        registrarMateria (idMateria);
    }
}

function crearWellNote (nombreMateria, idMateria,clase){
    var idClaseHora = clase["dia"]+ ( clase["hora"].split('-')[0] );
    var wellHtml =document.createElement('div') ;
    $(wellHtml).addClass("well-basic");
    $(wellHtml).addClass(idMateria);
    $(wellHtml).text(nombreMateria +" - "+clase["aula"]);
    
    if (clase["auxiliatura"]=== undefined) {
        $(wellHtml).addClass("well-note");
    } else {
        $(wellHtml).addClass("well-note-auxiliar");
    }

    $(wellHtml).appendTo($('#'+idClaseHora));
}

function registrarMateria (idMateria){
    materiasAgregadas.push(idMateria);
}

function crearBanderaNote (nombreMateria,idMateria){

}

function eliminarMateria(){
    //elimina la materia internamente 
    //tambien elimina de la lista y de la tabla
}


