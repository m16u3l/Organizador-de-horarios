var deleteArray = [];
var updateArray = [];
var newArray = [];

var mongoose = require('mongoose');
var promise = mongoose.connect('mongodb://localhost/organizadoraHorarios', {
    useMongoClient: true,
});

var conn = mongoose.connection;
var carrera = mongoose.model('Carrera');

function check(entrante, actual) {
    console.log("entre");
    if (actual != null) {
        if (entrante.codigo == actual.codigo) {
            checkNiveles(entrante.niveles, actual.niveles);
        } else {
            newArray = entrante;
            updateArray = entrante;
        }
    } else {
        conn.collection('carreras').insert(entrante);
    }

}

function checkNiveles(nivelesEntrante, nivelesActual) {
    for (var i in nivelesEntrante) {
        if (nivelesEntrante[i].nivel == nivelesActual[i].nivel) {
            checkMaterias(nivelesEntrante[i].materias, nivelesActual[i].materias);
        } else {
            //revisar
            newArray = newArray + nivelesEntrante[i];
        }
    }
}

function checkMaterias(materiasEntrante, materiasActual) {
    var encontre;
    var matchingA = [];

    matchingA = iniArrayBool(materiasActual.length);

    for (var i in materiasEntrante) {
        encontre = false;
        var materiaE = materiasEntrante[i];
        for (var j in materiasActual) {
            var materiaA = materiasActual[j];

            if (!matchingA[j])
                if (materiaE.codigoMateria == materiaA.codigoMateria) {
                    encontre = true;
                    matchingA[j] = true;
                    checkGrupos(materiaE.grupos, materiaA.grupos);
                    break;
                }
        }

        if (!encontre) console.log("nuevo materia" + materiaE.nombre);

    }

    for (var i in matchingA)
        if (!matchingA[i])
            console.log("eliminado materia" + materiasActual[i].nombre);

}

function checkGrupos(gruposEntrante, gruposActual) {

    var encontre;
    var matchingA = [];

    matchingA = iniArrayBool(gruposActual.length);

    for (var i in gruposEntrante) {
        var grupoE = gruposEntrante[i];
        encontre = false;
        for (var j in gruposActual) {
            var grupoA = gruposActual[j];

            if (!matchingA[j])
                if (grupoE.nombre == grupoA.nombre) {

                    matchingA[j] = true;
                    encontre = true;
                    if (checkHorarios(grupoE.horarios, grupoA.horarios))
                        console.log("no modificado grupo" + grupoE.nombre + " " + grupoE.docente);
                    else
                        console.log("modificado grupo" + grupoE.nombre + " " + grupoE.docente);
                    break;
                }

        }

        if (!encontre) console.log("nuevo grupo" + grupoE.nombre);

    }

    for (var i in matchingA)
        if (!matchingA[i])
            console.log("eliminado grupo" + gruposActual[i].nombre);

}

function checkHorarios(horariosEntrante, horariosActual) {
    var answer = true;
    var encontre;
    var matchingA = [];

    matchingA = iniArrayBool(horariosActual.length);

    for (var i in horariosEntrante) {
        encontre = false;
        for (var j in horariosActual) {
            if (esIgual(horariosEntrante[i], horariosActual[j])) {
                matchingA[j] = true;
                encontre = true;
                break;
            }
        }
        if (!encontre) {
            answer = false;
            break;
        }
    }

    for (var i in matchingA)
        if (!matchingA[i])
            answer = false;

    return answer;
}

function esIgual(horarioE, horarioA) {
    var answer = true;
    if (horarioE.aula != horarioA.aula) answer = false;
    if (horarioE.hora != horarioA.hora) answer = false;
    if (horarioE.dia != horarioA.dia) answer = false;
    return answer;
}

function iniArrayBool(tam) {
    var answer = [];
    for (var i = 0; i < tam; i++) answer.push(false);
    return answer;
}

module.exports = {
    iniArrayBool: iniArrayBool,
    esIgual: esIgual,
    checkHorarios: checkHorarios,
    checkGrupos: checkGrupos,
}

module.exports.check = check;

//check(carrera, carrera1);

//console.log(deleteArray);
//console.log(updateArray);
//console.log(newArray);