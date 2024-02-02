import "../bootstrap-5.3.2/scss/bootstrap.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

// Abrir la base de datos
const db = indexedDB.open("ViajesLocales", 1);

// Crear la estructura de la base de datos durante la actualización
db.onupgradeneeded = function (ev) {
  const dataBase = ev.target.result;
  const usuarioObjStore = dataBase.createObjectStore("Usuarios", { keyPath: "username" });
  usuarioObjStore.createIndex("email", "email", { unique: true });
  usuarioObjStore.createIndex("password", "password", { unique: false });

  // Agregar usuarios iniciales
  usuarioObjStore.add({
    username: "user1",
    email: "user1@example.com",
    password: "password1"
  });
  usuarioObjStore.add({
    username: "user2",
    email: "user2@example.com",
    password: "password2"
  });
};

// Funciones CRUD

// Función para registrar un usuario
function registerUser() {
  const newUsername = document.getElementById("newUsername").value;
  const newEmail = document.getElementById("newEmailRegister").value;
  const newPassword = document.getElementById("newPassword").value;

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
};






  addUserRequest.onerror = function () {
    console.error("Error al registrar el usuario.");
  };
}

// Función para iniciar sesión de un usuario
function loginUser() {
  const username = document.getElementById("newUsername").value;
  const password = document.getElementById("newPassword").value;

  const transaction = db.result.transaction(["Usuarios"], "readwrite");
  const usuarioObjStore = transaction.objectStore("Usuarios");

  const getUserRequest = usuarioObjStore.get(username);

  getUserRequest.onsuccess = function (ev) {
    const user = ev.target.result;

    if (user && user.password === password) {
      console.log("Inicio de sesión exitoso.");
      // Cerrar el modal después de iniciar sesión
      const modal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
      modal.hide();
    } else {
      console.error("Credenciales incorrectas.");
    }
  };

  getUserRequest.onerror = function () {
    console.error("Error al buscar el usuario.");
  };
}

// Función para borrar una cuenta
function deleteUser() {
  const username = document.getElementById("usernameDelete").value;
  const password = document.getElementById("passwordDelete").value;

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
  };

  getUserRequest.onerror = function () {
    console.error("Error al buscar el usuario.");
  };
}

// Eventos de formulario

// Evento de envío del formulario de registro
document.getElementById("registerForm").addEventListener("submit", function (event) {
  event.preventDefault();
  registerUser();
});

// Evento de envío del formulario de inicio de sesión
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();
  loginUser();
});

// Evento de envío del formulario de borrado de cuenta
document.getElementById("deleteAccountForm").addEventListener("submit", function (event) {
  event.preventDefault();
  deleteUser();
});
