var la = [
    {
        '_id': '59d61628ae033c2054cfe439',
        'nombre': 'LICENCIATURA EN INGENIERIA INFORMATICA',
        '__v': 0,
        'niveles': [{
            'materias': [{
                '_id': '59d611d12a986a2630d59787', 'nombre': 'INGLES I', '__v': 0, 'grupos': [{
                    'horarios': [{ '_id': '59d604cd91652e39b047eac4', 'dia': 'VI', 'hora': '815-945', 'aula': 617, '__v': 0 }],
                    '__v': 0,
                    'docente': 'CESPEDES GUIZADA MARIA BENITA',
                    'nombre': 1, '_id': '59d610701199c63a746a76b0'
                }]
            }],
            '__v': 0,
            'nivel': 'A',
            '_id': '59d61565e3c64c37b85c24e5'
        }
        ]
    }
];
function simularAgregarMaterias(materias) {
    
    var nuevalista1 = materias.replace("+","");
    var nuevalista = nuevalista1.replace("+","");
    nuevalista.replace(" ","");
    nuevalista.replace(" ","");
    materiasObject = JSON.parse(JSON.stringify(nuevalista));
    console.log("HolA"+materiasObject+"Alo");
    console.log(materiasObject[0]);
    console.log(materiasObject[0]["niveles"]);
    for (materia of materiasObject) {
        agregarMateria(materia);
    }
}

function agregarMateria(materiaInscrita) {
    var horario = materiaInscrita["horarios"];
    //console.log(horario);
    /*for (hora of horario){
        console.log(hora);
        if (hora["auxiliatura"]!= null) {
            console.log(hora["auxiliatura"]);
        } else {
            console.log("hola");
        }
    }*/

}




