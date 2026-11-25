// Administracion de usuarios
function mostrarUsuarios() {
  var usuarios = obtenerUsuarios();
  var html = "";
  for (var i = 0; i < usuarios.length; i++) {
    var u = usuarios[i];
    html += "<tr><td>" + u.id + "</td><td>" + u.nombre + "</td><td>" + u.correo + "</td>";
    html += '<td><select onchange="cambiarRol(' + u.id + ', this.value)">';
    var roles = ["Cliente", "Repartidor", "Administrador"];
    for (var j = 0; j < roles.length; j++) {
      if (roles[j] == u.rol) {
        html += '<option selected>' + roles[j] + '</option>';
      } else {
        html += '<option>' + roles[j] + '</option>';
      }
    }
    html += "</select></td>";
    html += '<td><button class="rojo" onclick="borrarUsuario(' + u.id + ')">Borrar</button></td></tr>';
  }
  document.getElementById("tabla").innerHTML = html;
}

function agregarUsuario() {
  var nombre = document.getElementById("uNombre").value;
  var correo = document.getElementById("uCorreo").value.toLowerCase();
  var rol = document.getElementById("uRol").value;
  var usuarios = obtenerUsuarios();

  if (nombre == "" || correo.indexOf("@") == -1) { alert("Escribe un nombre y un correo válido"); return; }
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].correo == correo) { alert("Ese correo ya existe"); return; }
  }
  usuarios.push({ id: Date.now(), nombre: nombre, correo: correo, rol: rol });
  guardar("usuarios", usuarios);
  document.getElementById("uNombre").value = "";
  document.getElementById("uCorreo").value = "";
  mostrarUsuarios();
}

function cambiarRol(id, nuevoRol) {
  var usuarios = obtenerUsuarios();
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id == id) { usuarios[i].rol = nuevoRol; }
  }
  guardar("usuarios", usuarios);
}

function borrarUsuario(id) {
  if (confirm("¿Borrar este usuario?") == false) { return; }
  var usuarios = obtenerUsuarios();
  var nuevos = [];
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id != id) { nuevos.push(usuarios[i]); }
  }
  guardar("usuarios", nuevos);
  mostrarUsuarios();
}

mostrarUsuarios();
