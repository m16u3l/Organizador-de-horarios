var data = {
	nivel:"nothin",
	materia:"nothing",
	idMateria:"nothin",
	docente:"nothing",
	grupo:"nothing"
}

function agregarGrupo(docente, horario, codigoMateria, idGrupo,nombreMateria){
	var idGrupoAniadir = codigoMateria+'_'+idGrupo;
	$('#'+idGrupoAniadir).attr('disabled',true);
	agregarMateriaATablaHorario(docente, horario, idGrupoAniadir,nombreMateria);
}

function agregarMateriaATablaHorario(docente, horario, idGrupoAniadir,nombreMateria) {
	data.docente = docente;
	data.materia = nombreMateria;
	var datos = JSON.parse(horario);
	data.horario = datos;
	agregarMateria(data, idGrupoAniadir);
}

function agregarMateria(materiaInscrita, idGrupoAniadir) {

	var nombreMateria = materiaInscrita["materia"];
	var idMateria = "G" + idGrupoAniadir;
	var horario = materiaInscrita["horario"];

	for (clase of horario) {
		//agrega dentro de la tabla
		crearWellNote(nombreMateria, idMateria, clase);
	}
	//agrega en la lista de materias
	crearBanderaNote(nombreMateria, idMateria, idGrupoAniadir);
}

function crearWellNote(nombreMateria, idMateria, clase) {
	var idClaseHora = '#' + clase["dia"] + (clase["hora"].split('-')[0]);
	var wellHtml = document.createElement('div');
	$(wellHtml).attr('miNombreClase',idMateria);
	$(wellHtml).addClass("well-basic");
	$(wellHtml).addClass(idMateria);
	$(wellHtml).text(nombreMateria + " - " + clase["aula"]);

	if (clase["auxiliatura"] === undefined && clase["auxiliar"] === undefined) {
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

function crearBanderaNote(nombreMateria, idMateria, idGrupoAniadir) {
	var bandera = document.createElement('li');
	$(bandera).addClass('center-block');
	$(bandera).addClass(idMateria);//G123
	$(bandera).attr("miNombreClase",idMateria);//g123
	$(bandera).attr("idGrupoBoton",idGrupoAniadir);//123
	$(bandera).addClass(idGrupoAniadir);//123

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
		var idGrupoBoton = $(this).parent().parent().attr("idGrupoBoton");
		$('#'+idGrupoBoton).attr('disabled',false);
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