import "./db.js";
// Función para borrar una cuenta
function deleteUser() {
  const username = document.getElementById("usernameDelete").value;
  const password = document.getElementById("passwordDelete").value;

  // Mostrar el spinner después de 300ms
  const deleteButton = document.getElementById("deleteButton");
  const deleteButtonSpinner = document.getElementById("deleteButtonSpinner");
  deleteButtonSpinner.classList.remove("d-none");

  // Retraso de 300ms antes de ejecutar la operación de borrado
  setTimeout(function () {
    const transaction = db.result.transaction(["Usuarios"], "readwrite");
    const usuarioObjStore = transaction.objectStore("Usuarios");

    const getUserRequest = usuarioObjStore.get(username);

    getUserRequest.onsuccess = function (ev) {
      const user = ev.target.result;

      if (user && user.password === password) {
        const deleteUserRequest = usuarioObjStore.delete(username);
        deleteUserRequest.onsuccess = function () {
          console.log("Cuenta borrada exitosamente.");
          // Cerrar el modal después de borrar la cuenta
          const modal = bootstrap.Modal.getInstance(
            document.getElementById("deleteAccountModal")
          );
          modal.hide();
        };
        deleteUserRequest.onerror = function () {
          console.error("Error al borrar la cuenta.");
        };
      } else {
        console.error("Credenciales incorrectas.");
      }

      // Ocultar el spinner después de la operación
      deleteButtonSpinner.classList.add("d-none");
    };

    getUserRequest.onerror = function () {
      console.error("Error al buscar el usuario.");
      // Ocultar el spinner si hay un error
      deleteButtonSpinner.classList.add("d-none");
    };
  }, 300); // 300 milisegundos de retraso
}
// Evento de envío del formulario de borrado de cuenta
document.getElementById("deleteAccountForm").addEventListener("submit", function (event) {
  event.preventDefault();
  deleteUser();
});
