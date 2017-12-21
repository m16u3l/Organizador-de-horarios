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

    var materias = getListaMaterias(horariosSimples);
    nivel.materias = materias;
    return nivel;
}
/**
 * 
 * @param {*} horariosSimples: lista de cada horario simple --> 
 * {codigoMateria, nombre,grupo,dia,hora,aula,docente}
 *  RETORNO lista de materias [ {nombre,codigo,grupos}, {}]
 */
function getListaMaterias(horariosSimples){
    var conjuntoMateria = [];
    while(horariosSimples.length>0){
        var codigoMateria = horariosSimples[0].codigoMateria;
        //obtain lista de materias iguales [{}{}]
        var listaPrimeraMateria = obtenerMateriasPorCodigo (codigoMateria,horariosSimples);
        //obtain materia
        var materia = obtenerMateria (listaPrimeraMateria);
        conjuntoMateria.push (materia);
    }
    return conjuntoMateria;
}
/**
 * 
 * @param {*} listaMateriaCodigo 
 * lista json con materias 
 * con el mismo codigo 
 * RETORNO json con la materia y todos sus grupos
 */
function obtenerMateria (listaPrimeraMateria){
    var res = {};
    res.nombre = listaPrimeraMateria[0].nombre;
    res.codigoMateria = listaPrimeraMateria[0].codigoMateria;
    var grupos = [];
    while(listaPrimeraMateria.length>0){
        var numeroGrupo = listaPrimeraMateria[0].grupo;
        var listaGrupoSimple = obtenerMateriasPorGrupo(numeroGrupo, listaPrimeraMateria);
        
        var grup = {};
        grup.nombre = listaGrupoSimple[0].grupo;
        if (listaGrupoSimple[0].docente)
            grup.docente = listaGrupoSimple[0].docente;
        else
            grup.docente = listaGrupoSimple[1].docente;

        var horarios = [];
        while (listaGrupoSimple.length>0){
            var dia = listaGrupoSimple.shift();
            var hora = {};
            hora.aula = dia.aula;
            hora.hora = dia.hora;
            hora.dia = dia.dia;
            if(dia.auxiliar){
                hora.auxiliar = dia.auxiliar;
            }
            horarios.push(hora);
        }
        grup.horarios = horarios;
        grupos.push(grup);
    }
    res.grupos = grupos;

    return res;
    
}

function obtenerMateriasPorGrupo (numeroGrupo, listaMateriaCodigo){
    var respuesta = [];
    var band = true;
    while (band && listaMateriaCodigo.length>0){
        var simple = listaMateriaCodigo.shift();
        if(simple.grupo === numeroGrupo){
            respuesta.push(simple);
        }else{
            listaMateriaCodigo.unshift(simple);
            band = false;
        }
    }
    return respuesta;
}

/**
 * 
 * @param {*} codigoMateria
 * codigo de materia a buscar 
 * @param {*} horariosSimples
 * lista json con todas las materias en el horario 
 */
function obtenerMateriasPorCodigo (codigoMateria, horariosSimples){
    var respuesta = [];
    var band = true;
    while (band && horariosSimples.length>0){
        var simple = horariosSimples.shift();
        if(simple.codigoMateria === codigoMateria){
            respuesta.push(simple);
        }else{
            horariosSimples.unshift(simple);
            band = false;
        }
    }
    return respuesta;
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