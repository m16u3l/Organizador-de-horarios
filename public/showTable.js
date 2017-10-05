//Simula la agregacion de todas las materias de la lista
//como si fueran pulsaciones de boton
function simularAgregarMaterias (materias){
    console.log(materias);
    console.log("Tamanio absoluto "+materias.length);
    for (materia of materias){
        agregarMateria (materia);
    }
}

function agregarMateria(materiaInscrita){
    var horario = materiaInscrita["horarios"];
    for (hora of horario){
        console.log(hora);
        if (hora["auxiliatura"]!= null) {
            console.log(hora["auxiliatura"]);
        } else {
            console.log("hola");
        }
    }
    
}