// Pagina del Carrito de compras
function mostrarCarrito() {
  var carrito = leer("carrito", []);
  var html = "";

  for (var i = 0; i < carrito.length; i++) {
    var p = buscarProducto(carrito[i].id);
    if (p != null) {
      html += '<div class="fila-carrito">';
      html += '<img src="../img/' + p.img + '" width="70"> ';
      html += '<span><b>' + p.nombre + '</b><br>' + p.desc + '</span> ';
      html += '<span><button onclick="restar(' + p.id + ')">-</button> ';
      html += carrito[i].cantidad;
      html += ' <button onclick="sumar(' + p.id + ')">+</button> ';
      html += dinero(p.precio * carrito[i].cantidad) + '</span> ';
      html += '<button class="rojo" onclick="quitar(' + p.id + ')">Borrar</button>';
      html += '</div>';
    }
  }

  if (carrito.length == 0) {
    html = "<p>Tu carrito está vacío</p>";
  }
  document.getElementById("lista").innerHTML = html;

  var subtotal = calcularSubtotal();
  var envio = calcularEnvio(subtotal);
  document.getElementById("subtotal").innerHTML = dinero(subtotal);
  if (subtotal == 0) {
    document.getElementById("envio").innerHTML = "---";
  } else if (envio == 0) {
    document.getElementById("envio").innerHTML = "Gratis";
  } else {
    document.getElementById("envio").innerHTML = dinero(envio);
  }
  document.getElementById("total").innerHTML = dinero(subtotal + envio);
}

function sumar(id) {
  var carrito = leer("carrito", []);
  var p = buscarProducto(id);
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id == id && carrito[i].cantidad < p.stock) {
      carrito[i].cantidad = carrito[i].cantidad + 1;
    }
  }
  guardar("carrito", carrito);
  mostrarCarrito();
}

function restar(id) {
  var carrito = leer("carrito", []);
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id == id && carrito[i].cantidad > 1) {
      carrito[i].cantidad = carrito[i].cantidad - 1;
    }
  }
  guardar("carrito", carrito);
  mostrarCarrito();
}

function quitar(id) {
  var carrito = leer("carrito", []);
  var nuevo = [];
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id != id) {
      nuevo.push(carrito[i]);
    }
  }
  guardar("carrito", nuevo);
  mostrarCarrito();
}

function irAlPago() {
  var carrito = leer("carrito", []);
  if (carrito.length == 0) {
    alert("Tu carrito está vacío");
  } else {
    window.location.href = "pago.html";
  }
}

mostrarCarrito();
