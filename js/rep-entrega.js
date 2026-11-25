// Repartidor: entrega en curso
var pedidos = obtenerPedidos();
var actual = null;
for (var i = 0; i < pedidos.length; i++) {
  if (pedidos[i].estado == "En camino") { actual = pedidos[i]; }
}

if (actual == null) {
  document.getElementById("entrega").innerHTML = '<p>No tienes una entrega en curso.</p><a href="pedidos.html">Ver pedidos disponibles</a>';
} else {
  var html = '<div class="tarjeta"><h3>Pedido ' + actual.id + "</h3>";
  html += "<p>Cliente: " + actual.cliente + "<br>Dirección: " + actual.direccion + "</p><ul>";
  for (var j = 0; j < actual.productos.length; j++) {
    html += "<li>" + actual.productos[j].cantidad + " x " + actual.productos[j].nombre + "</li>";
  }
  html += "</ul><p><b>Total a cobrar: " + dinero(actual.total) + "</b></p>";
  html += '<button onclick="entregado()">Marcar entregado</button> ';
  html += '<button class="rojo" onclick="problema()">Reportar problema</button></div>';
  document.getElementById("entrega").innerHTML = html;
}

function cambiarEstadoActual(nuevo) {
  var lista = obtenerPedidos();
  for (var k = 0; k < lista.length; k++) {
    if (lista[k].id == actual.id) { lista[k].estado = nuevo; }
  }
  guardar("pedidos", lista);
}

function entregado() {
  cambiarEstadoActual("Entregado");
  alert("Entrega registrada");
  window.location.href = "historial.html";
}

function problema() {
  var motivo = prompt("Describe el problema:");
  if (motivo == null || motivo == "") { return; }
  cambiarEstadoActual("Pendiente");
  window.location.href = "pedidos.html";
}
