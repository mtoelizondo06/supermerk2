// Control de inventario
function mostrarInventario() {
  var productos = obtenerProductos();
  var texto = document.getElementById("buscarInv").value.toLowerCase();
  var html = "";

  for (var i = 0; i < productos.length; i++) {
    var p = productos[i];
    if (p.nombre.toLowerCase().indexOf(texto) != -1) {
      html += "<tr><td>#" + p.id + "</td><td>" + p.nombre + "</td><td>" + p.categoria + "</td>";
      html += '<td><input type="number" id="stock' + p.id + '" value="' + p.stock + '" min="0" style="width:70px"></td>';
      if (p.stock < 10) {
        html += '<td class="bajo">Stock bajo</td>';
      } else {
        html += "<td>OK</td>";
      }
      html += '<td><button onclick="actualizar(' + p.id + ')">Actualizar</button></td></tr>';
    }
  }
  document.getElementById("tabla").innerHTML = html;
}

function actualizar(id) {
  var nuevoStock = Number(document.getElementById("stock" + id).value);
  if (nuevoStock < 0 || isNaN(nuevoStock)) { alert("Stock no válido"); return; }
  var productos = obtenerProductos();
  for (var i = 0; i < productos.length; i++) {
    if (productos[i].id == id) { productos[i].stock = nuevoStock; }
  }
  guardar("productos", productos);
  mostrarInventario();
}

mostrarInventario();
