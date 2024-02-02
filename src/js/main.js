import "../bootstrap-5.3.2/scss/bootstrap.scss";
import "bootstrap-icons/font/bootstrap-icons.css";


const db = indexedDB.open('ViajesLocales', 1);

db.onupgradeneeded = function(ev) {
  const dataBase = ev.target.result;

  const usuarioObjStore = dataBase.createObjectStore('Usuarios', { keyPath: 'username' });
  usuarioObjStore.createIndex('email', 'email', { unique: true });
  usuarioObjStore.createIndex('password', 'password', { unique: false });

  usuarioObjStore.add({
    username: 'user1',
    email: 'user1@example.com',
    password: 'password1'
  });
  usuarioObjStore.add({
    username: 'user2',
    email: 'user2@example.com',
    password: 'password2'
  });
};

// CRUD Functions

function registerUser() {
  const newUsername = document.getElementById('newUsername').value;
  const newEmail = document.getElementById('newEmailRegister').value;
  const newPassword = document.getElementById('newPassword').value;

  const transaction = db.result.transaction(['Usuarios'], 'readwrite');
  const usuarioObjStore = transaction.objectStore('Usuarios');

  const addUserRequest = usuarioObjStore.add({
    username: newUsername,
    email: newEmail,
    password: newPassword
  });

  addUserRequest.onsuccess = function(ev) {
    console.log('Usuario registrado exitosamente.');

  };


  addUserRequest.onerror = function(ev) {
    console.error('Error al registrar el usuario.');

  };
}

function loginUser() {
  const username = document.getElementById('newUsername').value;
  const email = document.getElementById('newEmailRegister').value
  const password = document.getElementById('newPassword').value;

  const transaction = db.result.transaction(['Usuarios'], 'readwrite');
  const usuarioObjStore = transaction.objectStore('Usuarios');

  const getUserRequest = usuarioObjStore.get(username);

  getUserRequest.onsuccess = function(ev) {
    const user = ev.target.result;

    if (user && user.password === password) {
      console.log('Inicio de sesión exitoso.');
    } else {
      console.error('Credenciales incorrectas.');

    }
  };

  getUserRequest.onerror = function(ev) {
    console.error('Error al buscar el usuario.');
  };
}


document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();
  registerUser();
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  loginUser();
});

