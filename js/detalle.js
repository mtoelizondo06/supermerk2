// Pagina de detalle de un producto
var parametros = new URLSearchParams(window.location.search);
var id = parametros.get("id");
if (id == null) { id = 1; }

var producto = buscarProducto(id);
if (producto == null) { producto = buscarProducto(1); }

var cantidad = 1;
var posicion = 0;
var filtros = ["none", "hue-rotate(60deg)", "grayscale(1)", "sepia(1)"];

// Mostrar los datos del producto
document.getElementById("nombre").innerHTML = producto.nombre;
document.getElementById("marca").innerHTML = producto.marca + " / " + producto.categoria;
document.getElementById("descripcion").innerHTML = producto.desc;
document.getElementById("precio").innerHTML = dinero(producto.precio);
document.getElementById("stock").innerHTML = "Disponibles: " + producto.stock;
document.getElementById("fotoGrande").src = "../img/" + producto.img;
document.getElementById("specs").innerHTML = "<li>Marca: " + producto.marca + "</li><li>Categoría: " + producto.categoria + "</li><li>Código: " + producto.id + "</li>";

var estrellas = "";
for (var i = 1; i <= 5; i++) {
  if (i <= producto.rating) { estrellas += "★"; } else { estrellas += "☆"; }
}
document.getElementById("estrellas").innerHTML = estrellas + " (" + producto.rating + ".0)";

// Miniaturas
for (var j = 0; j < 4; j++) {
  document.getElementById("mini" + j).src = "../img/" + producto.img;
  document.getElementById("mini" + j).style.filter = filtros[j];
}

function cambiarFoto(numero) {
  posicion = numero;
  if (posicion < 0) { posicion = 3; }
  if (posicion > 3) { posicion = 0; }
  document.getElementById("fotoGrande").style.filter = filtros[posicion];
}

function sumarCantidad() {
  if (cantidad < producto.stock) { cantidad = cantidad + 1; }
  document.getElementById("cantidad").innerHTML = cantidad;
}

function restarCantidad() {
  if (cantidad > 1) { cantidad = cantidad - 1; }
  document.getElementById("cantidad").innerHTML = cantidad;
}

function agregar() {
  agregarAlCarrito(producto.id, cantidad);
}

function verEspecificaciones() {
  var lista = document.getElementById("specs");
  if (lista.style.display == "none") {
    lista.style.display = "block";
  } else {
    lista.style.display = "none";
  }
}

function favorito() {
  var corazon = document.getElementById("corazon");
  if (corazon.innerHTML == "🤍") {
    corazon.innerHTML = "❤️";
  } else {
    corazon.innerHTML = "🤍";
  }
}
