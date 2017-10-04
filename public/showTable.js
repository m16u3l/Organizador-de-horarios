var materias = [
                {
                    "materia": "INGLES I",
                    "docente": "CESPEDES GUIZADA MARIA BENITA",
                    "grupo": 1,
                    "horario": [
                        {
                            "dia": "LU",
                            "hora": "815-945",
                            "aula": "617"
                        },
                        {
                            "dia": "VI",
                            "hora": "815-945",
                            "aula": "691D"
                        }
                    ]
                },
                {
                    "materia": "INTRODUCCION A LA PROGRAMACION",
                    "docente": "BLANCO COCA LETICIO",
                    "grupo": 2,
                    "horario": [
                        {
                            "dia": "MA",
                            "hora": "1715-1845",
                            "aula": "617"
                        },
                        {
                            "auxiliatura": "ALURRALDE SANCHEZ ANTONIO",
                            "dia": "MI",
                            "hora": "1715-1845",
                            "aula": "691B"
                        },
                        {
                            "dia": "JU",
                            "hora": "1545-1715",
                            "aula": "624"
                        }
                    ]
                },
                {
                    "materia": "INTRODUCCION A LA PROGRAMACION",
                    "docente": "COSTAS JAUREGUI VLADIMIR ABEL",
                    "grupo": 10,
                    "horario": [
                        {
                            "dia": "MA",
                            "hora": "945-1115",
                            "aula": "692D"
                        },
                        {
                            "dia": "JU",
                            "hora": "945-1115",
                            "aula": "693A"
                        },
                        {
                            "auxiliatura": "AUXILIAR POR DESIGNAR",
                            "dia": "JU",
                            "hora": "1415-1545",
                            "aula": "691B"
                        }
                    ]
                },
                {
                    "materia": "REDES DE COMPUTADORAS",
                    "docente": "ORELLANA ARAOZ JORGE WALTER",
                    "numero": 2,
                    "horario": [
                        {
                            "dia": "LU",
                            "hora": "945-1115",
                            "aula": "691B"
                        },
                        {
                            "dia": "MA",
                            "hora": "945-1115",
                            "aula": "691C"
                        },
                        {
                            "dia": "VI",
                            "hora": "815-945",
                            "aula": "692B"
                        }
                    ]
                },
                {
                    "materia": "TALLER DE BASE DE DATOS",
                    "docente": "FLORES SOLIZ JUAN MARCELO",
                    "numero": 3,
                    "horario": [
                        {
                            "dia": "LU",
                            "hora": "645-815",
                            "aula": "690B"
                        },
                        {
                            "dia": "VI",
                            "hora": "645-815",
                            "aula": "690B"
                        }
                    ]
                }
            ];

//Simula la agregacion de todas las materias de la lista
//como si fueran pulsaciones de boton
function simularAgregarMaterias (){
    for (i = 0; i<materias.length ; i++){
        agregarMateria (materias[i]);
    }
}

function agregarMateria(materiaInscrita){
    //Aqui se agrega la materia a la tabla
}