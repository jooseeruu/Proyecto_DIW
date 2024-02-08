import "./db.js";
// Función para registrar un usuario
function registerUser() {
  const newUsername = document.getElementById("newUsername").value;
  const newEmail = document.getElementById("newEmailRegister").value;
  const newPassword = document.getElementById("newPassword").value;

  // Mostrar el spinner
  const registerButton = document.getElementById("registerButton");
  const registerButtonSpinner = document.getElementById("registerButtonSpinner");
  registerButtonSpinner.classList.remove("d-none");
  registerButton.disabled = true; // Deshabilitar el botón mientras se procesa el registro

  const transaction = db.result.transaction(["Usuarios"], "readwrite");
  const usuarioObjStore = transaction.objectStore("Usuarios");

  const addUserRequest = usuarioObjStore.add({
    username: newUsername,
    email: newEmail,
    password: newPassword
  });

  addUserRequest.onsuccess = function () {
    console.log("Usuario registrado exitosamente.");
    const modal = bootstrap.Modal.getInstance(document.getElementById("registerModal"));
    if (modal) {
      modal.hide();
    } else {
      console.error("No se pudo obtener la instancia del modal.");
    }

    // Ocultar el spinner después de 300ms
    setTimeout(function () {
      registerButtonSpinner.classList.add("d-none");
      registerButton.disabled = false; // Habilitar el botón después de procesar el registro
    }, 300); // 300 milisegundos de retraso
  };

  addUserRequest.onerror = function () {
    console.error("Error al registrar el usuario.");

    // Ocultar el spinner después de 300ms incluso en caso de error
    setTimeout(function () {
      registerButtonSpinner.classList.add("d-none");
      registerButton.disabled = false; // Habilitar el botón después de procesar el registro
    }, 300);
  };
}
// Evento de envío del formulario de registro
document.getElementById("registerForm").addEventListener("submit", function (event) {
  event.preventDefault();
  registerUser();
});
