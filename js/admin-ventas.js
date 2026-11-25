// Ventas (pedidos) para el administrador
var estados = ["Pendiente", "En camino", "Entregado", "Cancelado"];

function mostrarVentas() {
  var pedidos = obtenerPedidos();
  var filtro = document.getElementById("filtro").value;
  var html = "";
  var suma = 0;

  for (var i = 0; i < pedidos.length; i++) {
    var o = pedidos[i];
    if (filtro == "" || o.estado == filtro) {
      var texto = "";
      for (var j = 0; j < o.productos.length; j++) {
        texto += o.productos[j].cantidad + " x " + o.productos[j].nombre + ". ";
      }
      html += "<tr><td>" + o.id + "</td><td>" + o.fecha + "</td><td>" + o.cliente + "</td><td>" + texto + "</td><td>" + dinero(o.total) + "</td>";
      html += '<td><select onchange="cambiarEstado(\'' + o.id + '\', this.value)">';
      for (var k = 0; k < estados.length; k++) {
        if (estados[k] == o.estado) {
          html += "<option selected>" + estados[k] + "</option>";
        } else {
          html += "<option>" + estados[k] + "</option>";
        }
      }
      html += "</select></td></tr>";
      if (o.estado != "Cancelado") { suma = suma + o.total; }
    }
  }
  if (html == "") { html = '<tr><td colspan="6">No hay ventas</td></tr>'; }
  document.getElementById("tabla").innerHTML = html;
  document.getElementById("suma").innerHTML = dinero(suma);
}

function cambiarEstado(id, nuevoEstado) {
  var pedidos = obtenerPedidos();
  for (var i = 0; i < pedidos.length; i++) {
    if (pedidos[i].id == id) { pedidos[i].estado = nuevoEstado; }
  }
  guardar("pedidos", pedidos);
  mostrarVentas();
}

mostrarVentas();
