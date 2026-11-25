// Dashboard del administrador: productos y metricas
function mostrarMetricas() {
  var pedidos = obtenerPedidos();
  var usuarios = obtenerUsuarios();
  var ventas = 0;
  var pendientes = 0;
  var clientes = 0;
  for (var i = 0; i < pedidos.length; i++) {
    if (pedidos[i].estado != "Cancelado") { ventas = ventas + pedidos[i].total; }
    if (pedidos[i].estado == "Pendiente") { pendientes = pendientes + 1; }
  }
  for (var j = 0; j < usuarios.length; j++) {
    if (usuarios[j].rol == "Cliente") { clientes = clientes + 1; }
  }
  document.getElementById("ventas").innerHTML = dinero(ventas);
  document.getElementById("clientes").innerHTML = clientes;
  document.getElementById("pendientes").innerHTML = pendientes;
}

function mostrarTabla() {
  var productos = obtenerProductos();
  var html = "";
  for (var i = 0; i < productos.length; i++) {
    var p = productos[i];
    html += "<tr>";
    html += "<td>#" + p.id + "</td><td>" + p.nombre + "</td><td>" + dinero(p.precio) + "</td>";
    if (p.stock < 10) {
      html += '<td class="bajo">' + p.stock + "</td>";
    } else {
      html += "<td>" + p.stock + "</td>";
    }
    html += '<td><button onclick="editar(' + p.id + ')">Editar</button> ';
    html += '<button class="rojo" onclick="borrar(' + p.id + ')">Borrar</button></td>';
    html += "</tr>";
  }
  document.getElementById("tabla").innerHTML = html;
}

function nuevoProducto() {
  document.getElementById("idProducto").value = "";
  document.getElementById("pNombre").value = "";
  document.getElementById("pMarca").value = "";
  document.getElementById("pCategoria").value = "";
  document.getElementById("pPrecio").value = "";
  document.getElementById("pStock").value = "";
  document.getElementById("formProducto").style.display = "block";
}

function editar(id) {
  var p = buscarProducto(id);
  document.getElementById("idProducto").value = p.id;
  document.getElementById("pNombre").value = p.nombre;
  document.getElementById("pMarca").value = p.marca;
  document.getElementById("pCategoria").value = p.categoria;
  document.getElementById("pPrecio").value = p.precio;
  document.getElementById("pStock").value = p.stock;
  document.getElementById("formProducto").style.display = "block";
}

function cancelar() {
  document.getElementById("formProducto").style.display = "none";
}

function guardarProducto() {
  var productos = obtenerProductos();
  var id = document.getElementById("idProducto").value;
  var nombre = document.getElementById("pNombre").value;
  var marca = document.getElementById("pMarca").value;
  var categoria = document.getElementById("pCategoria").value;
  var precio = Number(document.getElementById("pPrecio").value);
  var stock = Number(document.getElementById("pStock").value);

  if (nombre == "" || marca == "" || categoria == "") { alert("Llena todos los campos"); return; }
  if (precio <= 0 || stock < 0) { alert("Precio o stock no válido"); return; }

  if (id == "") {
    // producto nuevo: buscamos el id mas grande y le sumamos 1
    var mayor = 0;
    for (var i = 0; i < productos.length; i++) {
      if (productos[i].id > mayor) { mayor = productos[i].id; }
    }
    productos.push({ id: mayor + 1, nombre: nombre, marca: marca, categoria: categoria, precio: precio, stock: stock, img: "prod1.svg", desc: "Sin descripción", rating: 4 });
  } else {
    for (var j = 0; j < productos.length; j++) {
      if (productos[j].id == id) {
        productos[j].nombre = nombre;
        productos[j].marca = marca;
        productos[j].categoria = categoria;
        productos[j].precio = precio;
        productos[j].stock = stock;
      }
    }
  }
  guardar("productos", productos);
  cancelar();
  mostrarTabla();
}

function borrar(id) {
  if (confirm("¿Seguro que quieres borrar este producto?") == false) { return; }
  var productos = obtenerProductos();
  var nuevos = [];
  for (var i = 0; i < productos.length; i++) {
    if (productos[i].id != id) { nuevos.push(productos[i]); }
  }
  guardar("productos", nuevos);
  mostrarTabla();
}

function descargarReporte() {
  var productos = obtenerProductos();
  var texto = "ID,Nombre,Precio,Stock\n";
  for (var i = 0; i < productos.length; i++) {
    texto += productos[i].id + "," + productos[i].nombre + "," + productos[i].precio + "," + productos[i].stock + "\n";
  }
  var enlace = document.createElement("a");
  enlace.href = "data:text/csv;charset=utf-8," + encodeURIComponent(texto);
  enlace.download = "reporte_productos.csv";
  enlace.click();
}

mostrarMetricas();
mostrarTabla();
