var procesamiento;
var conteoHorario;
var ignoreFrases = ['SisMat','Nombre del Docente','Horario de Clases por Plan de estudios',
                    'Plan:','Nivel de Estudios:','Nombre Materia','Grupo',
                    'Horario','Si encuentra un (*) en el horario, éste corresponde a Ayudantía, Práctica o Laboratorio',
                    'Unica impresión OFICIAL de horarios en la Facultad',
                    'Elaborado por el Centro de Procesamiento de Datos @JcGa - FCyT'];


function getNivel (palabrasPagina){
    var nivel = {};
    nivel.nivel = palabrasPagina.shift();
    var horariosSimples = [];//{nivel,    materias[{grupos,nombre,codigo}   ]

    var contador = 0;
    var bloque = [];
    for(var i = 0 ; i< palabrasPagina.length; i++){
        contador++;
        bloque.push(palabrasPagina[i]);
        if (contador === 5 ){
            if (palabrasPagina[i+1] && palabrasPagina[i+1] === "(*)" ) {
                bloque.push(palabrasPagina[i+1]);
                i++;
            }
            var jsonMateria = getMateriaSimple(bloque);
            horariosSimples.push(jsonMateria);
            contador = 0 ;
            bloque = [];
        }
    }

    //var materias = getListaMaterias(horariosSimples);
    nivel.materias = horariosSimples;
    return nivel;
}
/**
 * 
 * @param {*} horariosSimples: lista de cada horario simple --> {codigoMateria, nombre,grupo,dia,hora,aula,docente} 
 */
function getListaMaterias(horariosSimples){
    var res = [];   //materias[{grupos,nombre,codigo}]
    
    var materiaActual = {};
    while(horariosSimples.length>0){
        var primerSimple = horarios.shift();
        if(!materiaActual.nombre){

        }
    }
}

function getMateriaSimple (listaMateria){
    var res = {};
    if (listaMateria.length>=5) {
        res.codigoMateria = listaMateria.shift();
        res.nombre = listaMateria.shift();
        res.grupo = listaMateria.shift();
        var diaHorario = listaMateria.shift().split(" ");//LU 815-945(617)
        res.dia = diaHorario[0];
        var horaAula = diaHorario[1].split("("); 
        res.hora = horaAula[0];
        res.aula = horaAula[1].split(")")[0];
        
        var docente = listaMateria.shift();
        if(listaMateria.length>0){
            res.auxiliar = docente;
        }else{
            res.docente=docente;
        }
        
    }
    return res;
}

function contains(obj) {
    for (var i = 0; i < ignoreFrases.length; i++) {
        if (ignoreFrases[i] === obj) {
            return true;
        }
    }
    return false;
}

module.exports.contains = contains;
module.exports.getNivel = getNivel;