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
	var idMateria = "MAT" + materiaInscrita["idMateria"];
	var horario = materiaInscrita["horario"];

	for (clase of horario) {
		//agrega dentro de la tabla
		crearWellNote(nombreMateria, idMateria, clase);
		//agrega en la lista de materias

		//registra la materia internamente
		registrarMateria(idMateria);


	}
	crearBanderaNote(nombreMateria, idMateria);
}

function crearWellNote(nombreMateria, idMateria, clase) {
	var idClaseHora = '#' + clase["dia"] + (clase["hora"].split('-')[0]);
	var wellHtml = document.createElement('div');
	$(wellHtml).addClass("well-basic");
	$(wellHtml).addClass(idMateria);
	$(wellHtml).text(nombreMateria + " - " + clase["aula"]);

	if (clase["auxiliatura"] === undefined) {
		$(wellHtml).addClass("well-note");
	} else {
		$(wellHtml).addClass("well-note-auxiliar");
	}

	$(wellHtml).appendTo($(idClaseHora));
	validateBroken(idClaseHora);
}

function validateBroken(idClaseHora) {
	console.log($(idClaseHora).children());
	if ($(idClaseHora).children().length > 1) {
		for(clase of $(idClaseHora).children()){
			$(clase).addClass('well-broken');
		}
	}
}
function crearBanderaNote(nombreMateria, idMateria) {
	var bandera = document.createElement('li');
	$(bandera).addClass('col-md-4');
	$(bandera).addClass('center-block');
	$(bandera).addClass('bandera');
	$(bandera).addClass(idMateria);

	var contenido = document.createElement('div');
	$(contenido).addClass('btn');
	$(contenido).addClass('btn-success');
	$(contenido).addClass('disabled');
	$(contenido).text(nombreMateria);

	$(bandera).append($(contenido));

	$('#lista-banderas').append($(bandera));

	var botonEliminar = document.createElement('button');
	$(botonEliminar).addClass(idMateria);
	$(botonEliminar).addClass('removebtn');
	$(botonEliminar).addClass('btn-circle');
	$(contenido).append($(botonEliminar));

	$('.removebtn').on('click',function () {
		var claseIdMateria = this.className.substr(0, 6);
		$('div').remove('.'+claseIdMateria);	
		$(this).parent().remove();
		$('div').removeClass("well-broken"); 
		validateBroken();  
		
    });
}

function registrarMateria(idMateria) {
	materiasAgregadas.push(idMateria);
}