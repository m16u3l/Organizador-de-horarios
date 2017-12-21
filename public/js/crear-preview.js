var previewDePrueba = {
  "anadidas": [{
      "nivel": "A",
      "materias": [{
          "nombreMateria": "INGLES I",
          "grupos": [{
            "nombreGrupo": "5",
            "horarios": [{
                "aula": "692B",
                "hora": "1845-2015",
                "dia": "LU"
              },
              {
                "aula": "692B",
                "hora": "1845-2015",
                "dia": "MI"
              },
              {
                "aula": "692D",
                "hora": "945-1115",
                "dia": "SA",
                "auxiliar": "CHIPANA WARISTE RONALD HUMBERTO"
              }
            ]
          }]
        },
        {
          "nombreMateria": "CALCULO I",
          "grupos": [{
            "nombreGrupo": "5",
            "horarios": [{
                "aula": "692B",
                "hora": "1845-2015",
                "dia": "LU"
              },
              {
                "aula": "692B",
                "hora": "1845-2015",
                "dia": "MI"
              },
              {
                "aula": "692D",
                "hora": "945-1115",
                "dia": "SA",
                "auxiliar": "CHIPANA WARISTE RONALD HUMBERTO"
              }
            ]
          }]
        }
      ]
    },
    {
      "nivel": "B",
      "materias": [{
        "nombreMateria": "INGLES I",
        "grupos": [{
          "nombreGrupo": "5",
          "horarios": [{
              "aula": "692B",
              "hora": "1845-2015",
              "dia": "LU"
            },
            {
              "aula": "692B",
              "hora": "1845-2015",
              "dia": "MI"
            },
            {
              "aula": "692D",
              "hora": "945-1115",
              "dia": "SA",
              "auxiliar": "CHIPANA WARISTE RONALD HUMBERTO"
            }
          ]
        }]
      }]
    }


  ],
  "modificadas": [{
      "nivel": "A",
      "materias": [{
        "nombreMateria": "INGLES I",
        "grupos": [{
          "nombreGrupo": "1",
          "horarios": [{
              "aula": "692B",
              "hora": "2015-2145",
              "dia": "LU"
            },
            {
              "aula": "690A",
              "hora": "1845-2015",
              "dia": "MI"
            },
            {
              "aula": "692D",
              "hora": "945-1115",
              "dia": "SA",
              "auxiliar": "CHIPANA WARISTE RONALD HUMBERTO"
            }
          ]
        }]
      }]
    }

  ],
  "eliminadas": [{
      "nivel": "A",
      "materias": [{
        "nombreMateria": "INGLES I",
        "grupos": [{
          "nombreGrupo": "5",
          "horarios": [{
              "aula": "692B",
              "hora": "1845-2015",
              "dia": "LU"
            },
            {
              "aula": "692B",
              "hora": "1845-2015",
              "dia": "MI"
            },
            {
              "aula": "692D",
              "hora": "945-1115",
              "dia": "SA",
              "auxiliar": "CHIPANA WARISTE RONALD HUMBERTO"
            }
          ]
        }]
      }]
    }

  ]
}

function test() {
  createPreview(previewDePrueba);
}

function createPreview(jsonContent) {
  for (nivel of jsonContent.anadidas) {
    crearNiveles($('#tableAnadidas'), nivel);
  }

  for (nivel of jsonContent.modificadas) {
    crearNiveles($('#tableModificadas'), nivel);
  }
  for (nivel of jsonContent.eliminadas) {
    crearNiveles($('#tableEliminadas'), nivel);
  }

}

function crearNiveles(tablaActual, nivelActual) {
  var nuevaFila = document.createElement('tr');
  var nivel = document.createElement('th');
  var columnaMaterias = document.createElement('td');
  var tablaMaterias = document.createElement('table');

  $(nivel).addClass('text-center');
  $(nivel).addClass(nivelActual.nivel);
  $(nivel).addClass("align-middle");
  $(nivel).addClass("nivelPreview");
  $(nivel).text("Nivel " + nivelActual.nivel);
  $(nuevaFila).append(nivel);
  $(nuevaFila).append(columnaMaterias);
  $(tablaMaterias).addClass("tabla-materia");
  $(tablaMaterias).addClass("table-sm");
  $(columnaMaterias).append(tablaMaterias);
  

  $(tablaActual).append(nuevaFila);
  $(tablaActual).addClass("tabla-nivel");
  for (materia of nivelActual.materias) {
    crearMaterias(materia, tablaMaterias);
  }
}

function crearMaterias(materiaActual, tablaMaterias) {


  var columnaGrupos = document.createElement('td');
  var nuevaFila = document.createElement('tr');
  var materia = document.createElement('th');
  var tablaGrupos = document.createElement('table');

  $(tablaGrupos).addClass("tabla-grupo");
  $(tablaGrupos).addClass("table-sm");
  $(materia).addClass(materiaActual.nombreMateria);
  $(materia).text(materiaActual.nombreMateria);
  $(materia).addClass("align-middle");
  $(nuevaFila).append(materia);
  $(nuevaFila).append(columnaGrupos);
  $(columnaGrupos).append(tablaGrupos);
  $(tablaMaterias).append(nuevaFila);

  for (grupo of materiaActual.grupos) {
    crearGrupos(grupo, tablaGrupos);
  }

}

function crearGrupos(grupoActual, tablaGrupos){
  var columnaHorarios = document.createElement('td');
  var nuevaFila = document.createElement('tr');
  var grupo = document.createElement('th');
  var tablaHorarios = document.createElement('table');

  $(tablaHorarios).addClass("tabla-grupo");
  $(tablaHorarios).addClass("table-sm");
  $(grupo).text("Grupo " +grupoActual.nombreGrupo);
  $(grupo).addClass("align-middle");
  $(nuevaFila).append(grupo);
  $(nuevaFila).append(columnaHorarios);
  $(columnaHorarios).append(tablaHorarios);
  $(tablaGrupos).append(nuevaFila);

  for (horario of grupoActual.horarios) {
    crearHorarios(horario, tablaHorarios);
  }
}

function crearHorarios(horarioActual, tablaHorarios){
  var nuevaFila = document.createElement('tr');
  var horario = document.createElement('th');
  $(horario).text(horarioActual.dia + horarioActual.hora + horarioActual.aula);
  $(nuevaFila).append(horario);
  $(tablaHorarios).append(nuevaFila);

}