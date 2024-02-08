fetch("https://jsonplaceholder.typicode.com/comments")
  .then((response) => response.json())
  .then((data) => {
    // Selecciona el contenedor de comentarios
    const comentariosDiv = document.getElementById("comentarios");

    // Toma solo los primeros 3 comentarios
    const primerosComentarios = data.slice(0, 3);

    // Itera sobre los primeros comentarios y crea un elemento para cada uno
    primerosComentarios.forEach((comentario, index) => {
      // Clona la plantilla de tarjeta
      const comentarioDiv = document
        .querySelector(".comentario-template")
        .cloneNode(true);
      comentarioDiv.style.display = "block";
      comentarioDiv.id = "comentario" + index; // Añade un id único a cada comentario
      comentarioDiv.draggable = true; // Hace que el comentario sea arrastrable

      const nombreUsuario = comentarioDiv.querySelector(".nombre-usuario");
      nombreUsuario.textContent = comentario.email;

      const comentarioTexto = comentarioDiv.querySelector(".comentario-texto");
      comentarioTexto.textContent = comentario.body;

      // Añade el comentario al contenedor de comentarios
      comentariosDiv.appendChild(comentarioDiv);
    });

    // Agrega los eventos de arrastrar y soltar a cada comentario
    const dragItems = document.querySelectorAll(".comentario-template");
    let draggedItem = null; // Almacena el elemento que se está arrastrando

    dragItems.forEach((item) => {
      item.addEventListener("dragstart", function (event) {
        draggedItem = event.target;
        // Genera un color aleatorio
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        // Aplica el color aleatorio al fondo de la tarjeta
        draggedItem.style.backgroundColor = randomColor;
      });
    });

    // Agrega los eventos de arrastrar y soltar al contenedor de comentarios
    comentariosDiv.addEventListener("dragover", function (event) {
      event.preventDefault();
      // Encuentra el comentario más cercano a la posición del cursor
      const closest = Array.from(comentariosDiv.children).reduce((prev, curr) => {
        const prevRect = prev.getBoundingClientRect();
        const currRect = curr.getBoundingClientRect();
        return Math.abs(event.clientY - prevRect.top) <
          Math.abs(event.clientY - currRect.top)
          ? prev
          : curr;
      });
      // Si el comentario más cercano no es el que se está arrastrando, mueve el comentario arrastrado antes del más cercano
      if (closest !== draggedItem) {
        comentariosDiv.insertBefore(draggedItem, closest);
      }
    });
  })
  .catch((error) => console.error("Error:", error));
