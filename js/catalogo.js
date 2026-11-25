// Pagina del catalogo de productos
var imagenes = "../img/";
var parametros = new URLSearchParams(window.location.search);
var busqueda = parametros.get("q");

function mostrar() {
  var lista = obtenerProductos();
  var categoria = document.getElementById("categoria").value;
  var html = "";

  for (var i = 0; i < lista.length; i++) {
    var p = lista[i];
    var mostrarlo = true;

    if (categoria != "" && p.categoria != categoria) {
      mostrarlo = false;
    }
    if (busqueda != null && p.nombre.toLowerCase().indexOf(busqueda.toLowerCase()) == -1) {
      mostrarlo = false;
    }

    if (mostrarlo == true) {
      html += '<div class="producto">';
      html += '<a href="detalle-producto.html?id=' + p.id + '"><img src="' + imagenes + p.img + '"></a>';
      html += '<h4>' + p.nombre + '</h4>';
      html += '<p>' + p.desc + '</p>';
      html += '<div class="precio">' + dinero(p.precio) + '</div>';
      html += '<p>Disponibles: ' + p.stock + '</p>';
      html += '<button onclick="agregarAlCarrito(' + p.id + ', 1)">Agregar</button>';
      html += '</div>';
    }
  }

  if (html == "") {
    html = "<p>No se encontraron productos</p>";
  }
  document.getElementById("productos").innerHTML = html;
}

mostrar();
