// Registro de un cliente nuevo
function registrar() {
  var nombre = document.getElementById("nombre").value;
  var apellidos = document.getElementById("apellidos").value;
  var correo = document.getElementById("correo").value.toLowerCase();
  var clave = document.getElementById("clave").value;
  var clave2 = document.getElementById("clave2").value;
  var error = document.getElementById("error");
  var usuarios = obtenerUsuarios();

  if (nombre == "" || apellidos == "" || correo == "") { error.innerHTML = "Llena todos los campos"; return; }
  if (correo.indexOf("@") == -1) { error.innerHTML = "El correo no es válido"; return; }
  if (clave.length < 6) { error.innerHTML = "La contraseña debe tener mínimo 6 caracteres"; return; }
  if (clave != clave2) { error.innerHTML = "Las contraseñas no coinciden"; return; }
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].correo == correo) { error.innerHTML = "Ese correo ya existe"; return; }
  }

  usuarios.push({ id: usuarios.length + 1, nombre: nombre + " " + apellidos, correo: correo, rol: "Cliente" });
  guardar("usuarios", usuarios);
  guardar("sesion", { nombre: nombre, apellidos: apellidos, correo: correo, rol: "Cliente" });
  window.location.href = "catalogo.html";
}
