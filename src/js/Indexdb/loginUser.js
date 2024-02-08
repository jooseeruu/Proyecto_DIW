import "./db.js";
function loginUser() {
  const username = document.getElementById("newUsername").value;
  const password = document.getElementById("newPassword").value;

  // Mostrar el spinner
  const loginButton = document.getElementById("loginButton");
  const loginButtonSpinner = document.getElementById("loginButtonSpinner");
  loginButtonSpinner.classList.remove("d-none");
  loginButton.disabled = true; // Deshabilitar el botón mientras se procesa el inicio de sesión

  const transaction = db.result.transaction(["Usuarios"], "readwrite");
  const usuarioObjStore = transaction.objectStore("Usuarios");

  const getUserRequest = usuarioObjStore.get(username);

  getUserRequest.onsuccess = function (ev) {
    const user = ev.target.result;

    if (user) {
      setTimeout(function () {
        if (user.password === password) {
          console.log("Inicio de sesión exitoso.");

          const modal = bootstrap.Modal.getInstance(
            document.getElementById("loginModal")
          );
          modal.hide();
        } else {
          console.error("Credenciales incorrectas.");
        }

        loginButtonSpinner.classList.add("d-none");
        loginButton.disabled = false;
      }, 300);
    } else {
      console.error("El usuario no está registrado.");

      loginButtonSpinner.classList.add("d-none");
      loginButton.disabled = false;
    }
  };

  getUserRequest.onerror = function () {
    console.error("Error al buscar el usuario.");
  };
}
// Evento de envío del formulario de inicio de sesión
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();
  loginUser();
});
