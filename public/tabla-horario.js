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

var data = {
	nivel:"nothin",
	materia:"nothing",
	idMateria:"nothin",
	docente:"nothing",
	grupo:"nothing"
}

		$(document).ready(function() {
			$('input[type=checkbox]').on('change', function(){
				var flat = $(this).prop('checked');
				var parent = '#'+($(this).parent().parent().attr('id'));
				if ($(parent).children().length > 1) {
					$(parent).children("label").children().each(function pintarRojoWell(){
						$(this).prop('checked', false);
					});
				}else console.log("no entre");
				
				if(flat){
					var d = $(this).attr('docente');
					var h = $(this).attr('horarios');
					simularAgregarMaterias(d,h);
					$(this).prop('checked', true);
				}else{
					$(this).prop('checked', false);
				}
			});
		});

function simularAgregarMaterias(d,h) {
	data.docente = d;
	var datos = JSON.parse(h);
	data.horario = datos;
	agregarMateria(data);
}

function agregarMateria(materiaInscrita) {

	var nombreMateria = materiaInscrita["materia"];
	var idMateria = "MAT" + materiaInscrita["idMateria"];
	var horario = materiaInscrita["horario"];

	for (clase of horario) {
		//agrega dentro de la tabla
		crearWellNote(nombreMateria, idMateria, clase);
	}
	//agrega en la lista de materias
	crearBanderaNote(nombreMateria, idMateria);
}

function crearWellNote(nombreMateria, idMateria, clase) {
	var idClaseHora = '#' + clase["dia"] + (clase["hora"].split('-')[0]);
	var wellHtml = document.createElement('div');
	$(wellHtml).attr('miNombreClase',idMateria);
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
	if ($(idClaseHora).children().length > 1) {
		$(idClaseHora).children().each(function pintarRojoWell(){
			$(this).addClass('well-broken');
		});
	}
}

function crearBanderaNote(nombreMateria, idMateria) {
	var bandera = document.createElement('li');
	$(bandera).addClass('center-block');
	$(bandera).addClass(idMateria);
	$(bandera).attr("miNombreClase",idMateria);

	var contenido = document.createElement('div');
	$(contenido).addClass('btn');
	$(contenido).addClass('btn-primary');
	$(contenido).addClass('disabled');
	$(contenido).addClass('bandera');
	$(bandera).append($(contenido));

	var texto = document.createElement('p');
	$(texto).addClass('texto-bandera');
	$(texto).text(nombreMateria);
	$(contenido).append($(texto));

	$('#lista-banderas').append($(bandera));

	var botonEliminar = document.createElement('button');
	$(botonEliminar).addClass('removebtn');
	$(botonEliminar).addClass('btn-circle');
	$(contenido).append($(botonEliminar));

	$('.removebtn').on('click',function () {
		var claseIdMateria = $(this).parent().parent().attr("miNombreClase");
		$('div').remove('.'+claseIdMateria);	
		$(this).parent().parent().remove();
		limpiarTodosLosChoques();
    });
}


//tbody
//  tr 10hijos en total
//    td 7hijos en total (verificar aqui)
function limpiarTodosLosChoques(){
	verificarListaTR($('#cuerpoTabla').children());
}
function verificarListaTR(listaTR){
	for (let i = 0; i< listaTR.length-1;i++){
		verificarListaTD($(listaTR[i]).children());
	}
}

function verificarListaTD(listaTD){
	for (let j =0 ;j<listaTD.length-1;j++){
		if($(listaTD[j]).children().length <=1){
			$(listaTD[j]).children().each(function eliminarClaseBroken(){
				$(this).removeClass("well-broken");
			});
		}
	}
}

function construirData(nombre, id){
	data[id] = nombre;
}