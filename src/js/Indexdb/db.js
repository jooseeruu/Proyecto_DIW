import "./deleteUser.js";
import "./registerUser.js";
import "./loginUser.js";

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
