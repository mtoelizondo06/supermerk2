// Pedidos del cliente
var pedidos = obtenerPedidos();
var sesion = leer("sesion", null);
var html = "";

for (var i = 0; i < pedidos.length; i++) {
  var o = pedidos[i];
  // si hay sesion solo mostramos los pedidos de ese cliente
  var mostrarlo = true;
  if (sesion != null && o.cliente.indexOf(sesion.nombre) == -1) {
    mostrarlo = false;
  }
  if (mostrarlo == true) {
    var texto = "";
    for (var j = 0; j < o.productos.length; j++) {
      texto += o.productos[j].cantidad + " x " + o.productos[j].nombre + ". ";
    }
    html += "<tr><td>" + o.id + "</td><td>" + o.fecha + "</td><td>" + texto + "</td><td>" + dinero(o.total) + "</td><td>" + o.estado + "</td></tr>";
  }
}
if (html == "") {
  html = '<tr><td colspan="5">Todavía no tienes pedidos</td></tr>';
}
document.getElementById("tabla").innerHTML = html;
