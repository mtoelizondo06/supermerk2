// Iniciar sesion (es solo una simulacion, no hay servidor)
function iniciarSesion() {
  var correo = document.getElementById("correo").value.toLowerCase();
  var clave = document.getElementById("clave").value;
  var error = document.getElementById("error");
  var usuarios = obtenerUsuarios();

  if (correo == "" || clave == "") { error.innerHTML = "Llena todos los campos"; return; }
  if (clave.length < 6) { error.innerHTML = "La contraseña debe tener mínimo 6 caracteres"; return; }

  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].correo == correo) {
      var partes = usuarios[i].nombre.split(" ");
      guardar("sesion", { nombre: partes[0], apellidos: partes.slice(1).join(" "), correo: correo, rol: usuarios[i].rol });
      if (usuarios[i].rol == "Administrador") {
        window.location.href = "admin/dashboard.html";
      } else if (usuarios[i].rol == "Repartidor") {
        window.location.href = "repartidor/pedidos.html";
      } else {
        window.location.href = "catalogo.html";
      }
      return;
    }
  }
  error.innerHTML = "Ese correo no está registrado";
}
