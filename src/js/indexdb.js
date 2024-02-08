
const db = indexedDB.open("ViajesLocales", 1);


db.onupgradeneeded = function (ev) {
  const dataBase = ev.target.result;
  const usuarioObjStore = dataBase.createObjectStore("Usuarios", { keyPath: "username" });
  usuarioObjStore.createIndex("email", "email", { unique: true });
  usuarioObjStore.createIndex("password", "password", { unique: false });


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

          const modal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
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
