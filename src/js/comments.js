fetch("https://jsonplaceholder.typicode.com/comments")
  .then((response) => response.json())
  .then((data) => {
    // Selecciona el contenedor de comentarios
    const comentariosDiv = document.getElementById("comentarios");

    // Toma solo los primeros 3 comentarios
    const primerosComentarios = data.slice(0, 3);

    // Itera sobre los primeros comentarios y crea un elemento para cada uno
    primerosComentarios.forEach((comentario) => {
      // Clona la plantilla de tarjeta
      const comentarioDiv = document
        .querySelector(".comentario-template")
        .cloneNode(true);
      comentarioDiv.style.display = "block";

      const nombreUsuario = comentarioDiv.querySelector(".nombre-usuario");
      nombreUsuario.textContent = comentario.email;

      const comentarioTexto = comentarioDiv.querySelector(".comentario-texto");
      comentarioTexto.textContent = comentario.body;

      // Añade el comentario al contenedor de comentarios
      comentariosDiv.appendChild(comentarioDiv);
    });
  })
  .catch((error) => console.error("Error:", error));
