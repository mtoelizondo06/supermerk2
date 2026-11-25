

// Productos de ejemplo
var productosIniciales = [
  { id: 1, nombre: "Leche entera 1 L", marca: "Lala", categoria: "Lácteos", precio: 28.5, stock: 50, img: "caja-leche.png", desc: "Leche entera pasteurizada.", rating: 5 },
  { id: 2, nombre: "Pan de caja blanco", marca: "Bimbo", categoria: "Panadería", precio: 42, stock: 35, img: "pan-de-caja.png", desc: "Pan de caja grande de 680 g.", rating: 5 },
  { id: 3, nombre: "Manzana roja 1 kg", marca: "Granja", categoria: "Frutas", precio: 55, stock: 120, img: "manzana.png", desc: "Manzana roja fresca por kilo.", rating: 4 },
  { id: 4, nombre: "Bistec de res 1 kg", marca: "Cárnicos MX", categoria: "Carnes", precio: 189, stock: 5, img: "res.png", desc: "Corte de res fresco.", rating: 5 },
  { id: 5, nombre: "Jugo de naranja 1 L", marca: "Del Valle", categoria: "Bebidas", precio: 35, stock: 60, img: "jugo-naranja.png", desc: "Jugo de naranja sin conservadores.", rating: 4 },
  { id: 6, nombre: "Arroz 1 kg", marca: "Verde Valle", categoria: "Despensa", precio: 31, stock: 80, img: "arroz.png", desc: "Arroz grano largo.", rating: 4 },
  { id: 7, nombre: "Café molido 250 g", marca: "Nescafé", categoria: "Despensa", precio: 79, stock: 9, img: "cafe.png", desc: "Café molido tostado medio.", rating: 5 },
  { id: 8, nombre: "Jabón de baño 3 pzas", marca: "Dove", categoria: "Limpieza", precio: 48, stock: 40, img: "jabon.png", desc: "Jabón hidratante.", rating: 4 },
  { id: 9, nombre: "Papel higiénico 12 rollos", marca: "Regio", categoria: "Limpieza", precio: 89, stock: 70, img: "papel.png", desc: "Papel higiénico doble hoja.", rating: 5 },
  { id: 10, nombre: "Chocolate en barra", marca: "Abuelita", categoria: "Despensa", precio: 45, stock: 25, img: "chocolate.png", desc: "Chocolate para preparar.", rating: 5 },
  { id: 11, nombre: "Huevo 18 pzas", marca: "San Juan", categoria: "Lácteos", precio: 62, stock: 3, img: "huevos.png", desc: "Huevo blanco de 18 piezas.", rating: 4 },
  { id: 12, nombre: "Queso panela 400 g", marca: "Alpura", categoria: "Lácteos", precio: 74, stock: 30, img: "queso.png", desc: "Queso panela fresco.", rating: 4 }
];

// Usuarios de ejemplo
var usuariosIniciales = [
  { id: 1, nombre: "Ana López", correo: "ana@correo.com", rol: "Cliente" },
  { id: 2, nombre: "Luis Pérez", correo: "luis@correo.com", rol: "Cliente" },
  { id: 3, nombre: "Carlos Ruiz", correo: "carlos@correo.com", rol: "Repartidor" },
  { id: 4, nombre: "Admin General", correo: "admin@superya.com", rol: "Administrador" }
];

// Pedidos de ejemplo
var pedidosIniciales = [
  { id: "P-1001", cliente: "Ana López", fecha: "2026-11-01", direccion: "Av. Vallarta 1234, Guadalajara", productos: [{ nombre: "Leche entera 1 L", cantidad: 2, precio: 28.5 }], total: 57, estado: "Entregado" },
  { id: "P-1002", cliente: "Luis Pérez", fecha: "2026-11-05", direccion: "Calle Hidalgo 45, Zapopan", productos: [{ nombre: "Café molido 250 g", cantidad: 1, precio: 79 }, { nombre: "Chocolate en barra", cantidad: 2, precio: 45 }], total: 218, estado: "Pendiente" },
  { id: "P-1003", cliente: "Ana López", fecha: "2026-11-07", direccion: "Av. Vallarta 1234, Guadalajara", productos: [{ nombre: "Bistec de res 1 kg", cantidad: 3, precio: 189 }], total: 567, estado: "Pendiente" }
];

//Guardar y leer del navegador
function leer(nombre, valorPorDefecto) {
  var texto = localStorage.getItem(nombre);
  if (texto == null) {
    return valorPorDefecto;
  }
  return JSON.parse(texto);
}

function guardar(nombre, valor) {
  localStorage.setItem(nombre, JSON.stringify(valor));
}

function obtenerProductos() { return leer("productos", productosIniciales); }
function obtenerUsuarios() { return leer("usuarios", usuariosIniciales); }
function obtenerPedidos() { return leer("pedidos", pedidosIniciales); }

function buscarProducto(id) {
  var lista = obtenerProductos();
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id == id) {
      return lista[i];
    }
  }
  return null;
}

function dinero(numero) {
  return "$" + Number(numero).toFixed(2);
}

// Carrito 
function agregarAlCarrito(id, cantidad) {
  var producto = buscarProducto(id);
  if (producto.stock < 1) {
    alert("Producto agotado");
    return;
  }
  var carrito = leer("carrito", []);
  var encontrado = false;
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id == id) {
      carrito[i].cantidad = carrito[i].cantidad + cantidad;
      if (carrito[i].cantidad > producto.stock) {
        carrito[i].cantidad = producto.stock;
      }
      encontrado = true;
    }
  }
  if (encontrado == false) {
    carrito.push({ id: id, cantidad: cantidad });
  }
  guardar("carrito", carrito);
  alert("Producto agregado al carrito");
}

function calcularSubtotal() {
  var carrito = leer("carrito", []);
  var subtotal = 0;
  for (var i = 0; i < carrito.length; i++) {
    var p = buscarProducto(carrito[i].id);
    if (p != null) {
      subtotal = subtotal + p.precio * carrito[i].cantidad;
    }
  }
  return subtotal;
}

// Envio gratis si compra $500 o mas, si no cuesta $49
function calcularEnvio(subtotal) {
  if (subtotal == 0) { return 0; }
  if (subtotal >= 500) { return 0; }
  return 49;
}

// Buscador del encabezado
function buscar(paginaCatalogo) {
  var texto = document.getElementById("buscador").value;
  window.location.href = paginaCatalogo + "?q=" + texto;
}

//  Info del cliente 
function guardarCliente() {
  var nombre = document.getElementById("cliNombre").value;
  var correo = document.getElementById("cliCorreo").value;
  if (nombre == "" || correo == "") {
    alert("Escribe al menos tu nombre y tu correo");
    return;
  }
  var sesion = leer("sesion", {});
  sesion.nombre = nombre;
  sesion.apellidos = document.getElementById("cliApellidos").value;
  sesion.correo = correo;
  if (sesion.rol == null) { sesion.rol = "Cliente"; }
  guardar("sesion", sesion);
  alert("Datos guardados");
}

function cargarCliente() {
  var sesion = leer("sesion", null);
  if (sesion != null && document.getElementById("cliNombre") != null) {
    document.getElementById("cliNombre").value = sesion.nombre;
    document.getElementById("cliApellidos").value = sesion.apellidos;
    document.getElementById("cliCorreo").value = sesion.correo;
  }
}

function cerrarSesion(paginaLogin) {
  localStorage.removeItem("sesion");
  window.location.href = paginaLogin;
}

// Se ejecuta al abrir cualquier pagina
cargarCliente();
