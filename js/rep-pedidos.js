// Repartidor: pedidos disponibles
function mostrarPedidos() {
  var pedidos = obtenerPedidos();
  var html = "";
  for (var i = 0; i < pedidos.length; i++) {
    var o = pedidos[i];
    if (o.estado == "Pendiente") {
      html += '<div class="tarjeta"><b>' + o.id + "</b> - " + dinero(o.total) + "<br>";
      html += "Dirección: " + o.direccion + "<ul>";
      for (var j = 0; j < o.productos.length; j++) {
        html += "<li>" + o.productos[j].cantidad + " x " + o.productos[j].nombre + "</li>";
      }
      html += '</ul><button onclick="aceptar(\'' + o.id + '\')">Aceptar pedido</button></div>';
    }
  }
  if (html == "") { html = "<p>No hay pedidos disponibles</p>"; }
  document.getElementById("lista").innerHTML = html;
}

function aceptar(id) {
  var pedidos = obtenerPedidos();
  for (var i = 0; i < pedidos.length; i++) {
    if (pedidos[i].id == id) { pedidos[i].estado = "En camino"; }
  }
  guardar("pedidos", pedidos);
  window.location.href = "entrega.html";
}

mostrarPedidos();
