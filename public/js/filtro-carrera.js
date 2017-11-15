function filtro() {
  // Declare variables 
  var input, filtro, tabla, tr, td, i;
  input = document.getElementById("barraBusqueda");
  filtro = input.value.toUpperCase();
  tabla = document.getElementById("tablaCarreras");
  tr = tabla.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filtro) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}

function ordenarTabla() {
  var tabla, lineas, intercambiando, i, x, y, deberiaIntercambiar;
  tabla = document.getElementById("tablaCarreras");
  intercambiando = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (intercambiando) {
    // Start by saying: no switching is done:
    intercambiando = false;
    lineas = tabla.getElementsByTagName("TR");
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (lineas.length - 1); i++) {
      // Start by saying there should be no switching:
      deberiaIntercambiar = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = lineas[i].getElementsByTagName("A")[0];
      console.log(x);
      y = lineas[i + 1].getElementsByTagName("A")[0];
      console.log(y);
      // Check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        // I so, mark as a switch and break the loop:
        deberiaIntercambiar= true;
        break;
      }
    }
    if (deberiaIntercambiar) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      lineas[i].parentNode.insertBefore(lineas[i + 1], lineas[i]);
      intercambiando = true;
    }
  }
}