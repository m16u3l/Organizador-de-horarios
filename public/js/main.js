$(function(){
    function agregarGrupos(){
        $.ajax({
            url:'/cursos'
        }).done(function(cursos){
            var listaCursos = $('.lista-cursos');
            listaCursos.empty();
            cursos.forEach(function(curso) {
                var nuevoCurso = $('<li class = "curso">' + curso.materia +''+curso.docente+' '+curso.horario+' '+curso.seleccionado+ '</li>');
                nuevoCurso.appendTo(listaCursos);
            }, this);
        }).fail(function(){
            alert('No se pueden agregar los cursos :(');
        });
    }
    agregarGrupos();   
});