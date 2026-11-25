// Repartidor: historial de entregas (se paga $25 por entrega)
var pago = 25;
var pedidos = obtenerPedidos();
var html = "";
var cuantas = 0;

for (var i = 0; i < pedidos.length; i++) {
  if (pedidos[i].estado == "Entregado") {
    cuantas = cuantas + 1;
    html += "<tr><td>" + pedidos[i].id + "</td><td>" + pedidos[i].fecha + "</td><td>" + pedidos[i].cliente + "</td><td>" + dinero(pago) + "</td></tr>";
  }
}
if (html == "") { html = '<tr><td colspan="4">Sin entregas</td></tr>'; }
document.getElementById("tabla").innerHTML = html;
document.getElementById("cuantas").innerHTML = cuantas;
document.getElementById("ganancias").innerHTML = dinero(cuantas * pago);
