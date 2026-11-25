// Pagina de pago
var subtotal = calcularSubtotal();
var envio = calcularEnvio(subtotal);
var total = subtotal + envio;

document.getElementById("resumen").innerHTML = "Subtotal: " + dinero(subtotal) + "<br>Envío: " + dinero(envio) + "<br><b>Total: " + dinero(total) + "</b>";

var sesion = leer("sesion", null);
if (sesion != null) {
  document.getElementById("nombre").value = sesion.nombre + " " + sesion.apellidos;
}

function cambiarMetodo() {
  var metodo = document.getElementById("metodo").value;
  if (metodo == "tarjeta") {
    document.getElementById("datosTarjeta").style.display = "block";
  } else {
    document.getElementById("datosTarjeta").style.display = "none";
  }
}

function confirmarPedido() {
  var error = document.getElementById("error");
  var nombre = document.getElementById("nombre").value;
  var direccion = document.getElementById("direccion").value;
  var telefono = document.getElementById("telefono").value;
  var carrito = leer("carrito", []);

  if (carrito.length == 0) { error.innerHTML = "El carrito está vacío"; return; }
  if (nombre == "" || direccion == "") { error.innerHTML = "Llena el nombre y la dirección"; return; }
  if (telefono.length != 10 || isNaN(telefono)) { error.innerHTML = "El teléfono debe tener 10 números"; return; }
  if (document.getElementById("metodo").value == "tarjeta") {
    var tarjeta = document.getElementById("tarjeta").value;
    if (tarjeta.length != 16 || isNaN(tarjeta)) { error.innerHTML = "La tarjeta debe tener 16 números"; return; }
  }

  // Armar la lista de productos del pedido y bajar el stock
  var productos = obtenerProductos();
  var lista = [];
  for (var i = 0; i < carrito.length; i++) {
    for (var j = 0; j < productos.length; j++) {
      if (productos[j].id == carrito[i].id) {
        lista.push({ nombre: productos[j].nombre, cantidad: carrito[i].cantidad, precio: productos[j].precio });
        productos[j].stock = productos[j].stock - carrito[i].cantidad;
        if (productos[j].stock < 0) { productos[j].stock = 0; }
      }
    }
  }
  guardar("productos", productos);

  var pedidos = obtenerPedidos();
  var numero = "P-" + (1001 + pedidos.length);
  var hoy = new Date().toISOString().substring(0, 10);
  pedidos.push({ id: numero, cliente: nombre, fecha: hoy, direccion: direccion, productos: lista, total: total, estado: "Pendiente" });
  guardar("pedidos", pedidos);
  guardar("carrito", []);

  document.getElementById("formulario").style.display = "none";
  document.getElementById("confirmacion").style.display = "block";
  document.getElementById("confirmacion").innerHTML = "Pedido <b>" + numero + "</b> registrado. Total: " + dinero(total) + '<br><a href="mis-pedidos.html">Ver mis pedidos</a>';
}
