## Plataforma de Viajes Locales
   Este proyecto consiste en una plataforma web para una agencia de viajes locales llamada "ViajesLocales". La plataforma utiliza tecnologías web como HTML, JavaScript, Bootstrap, IndexedDB y Leaflet. A continuación, se proporciona una descripción detallada de cada parte del proyecto:

  1. Estructura del Proyecto
El proyecto está organizado de la siguiente manera:


📦 dist
📦 node_modules
📂 src
 ┣ 📂 assets
 ┣ 📂 bootstrap-5.3.2
 ┣ 📜 index.html
 ┗ 📂 js
   ┣ 📜 comments.js
   ┣ 📜 geolocation.js
   ┣ 📜 indexdb.js
   ┣ 📜 main.js
   ┗ 📜 tooltip.js
📜 .gitignore
📜 package-lock.json
📜 package.json
📜 README.md
📜 webpack.config.js


2. Tecnologías Utilizadas
HTML: Utilizado para definir la estructura y el contenido de la página web.

 - Bootstrap: Se emplea para la maquetación y diseño responsivo de la interfaz de usuario, así como para estilizar elementos como botones, modales y barras de navegación.

 - JavaScript : Se utiliza para agregar funcionalidades interactivas a la página, gestionar la base de datos indexada (IndexedDB) para almacenar ubicaciones, API de Drag and Drop para para arrastar cartas con texto, API de JSONPlaceholder  y emplear Leaflet para la visualización de mapas.

3. Enlaces Externos Utilizados
      - Bootstrap (v5.3.2):

         Framework de diseño CSS para la maquetación y diseño responsivo de la interfaz de usuario.


      - Bootstrap Icons 
          Conjunto de iconos utilizados para agregar elementos visuales a la interfaz de usuario.
           

      - Animate.css (v4.1.1):
         Librería de animaciones CSS utilizada para agregar efectos visuales a elementos de la página.

      - Leaflet
         Biblioteca de JavaScript para la visualización de mapas interactivos.

4. Funcionalidades Principales

   - Modales
      Inicio de Sesión: Permite a los usuarios iniciar sesión en la plataforma proporcionando su nombre de usuario, correo electrónico y contraseña.
      Registro: Permite a los usuarios registrarse en la plataforma proporcionando un nombre de usuario, correo electrónico y contraseña.
      Actualización de Usuario: Permite a los usuarios actualizar su información, incluyendo su nombre de usuario, correo electrónico y contraseña.
      Eliminación de Cuenta: Permite a los usuarios eliminar su cuenta de usuario de la plataforma.

   - Mapa de Ubicación
      Leaflet: Se utiliza Leaflet para mostrar un mapa interactivo en la sección "Sección Sobre Nosotros".
      Representación de Ubicaciones: Las ubicaciones almacenadas en IndexedDB se representan en el mapa mediante marcadores.
      Ubicación Actual del Usuario: La ubicación actual del usuario se obtiene mediante el navegador y se muestra en el mapa. Además, se guarda en el Local Storage del navegador.

   - Almacenamiento de Ubicaciones con IndexedDB
      Definición de Ubicaciones: Se definen tres ubicaciones iniciales y se almacenan en la base de datos IndexedDB durante la inicialización del proyecto.
      Integración de APIs Externas

   - API de JSONPlaceholder: 
      Se utiliza para generar texto aleatorio y simulación de solicitudes HTTP, proporcionando contenido de ejemplo para la aplicación.

   - API de Arrastrar y Soltar (Drag and Drop):
       Permite cambiar el color de las tarjetas al arrastrarlas, mejorando la experiencia de usuario mediante interacciones visuales.


   5. Instrucciones de Uso

      - Para utilizar la plataforma:

         Clona este repositorio en tu máquina local utilizando Git: 
         git clone <URL_del_repositorio>

      - Abre una terminal y navega hasta el directorio del proyecto clonado.

      - Ejecuta el siguiente comando para instalar las dependencias necesarias:

         npm install

      - Una vez completada la instalación, ejecuta el siguiente comando para iniciar el proyecto:

         npm run start

Abre tu navegador web y ve a la dirección http://localhost:8080 (por defecto) para acceder a la plataforma.

   6. Mejoras Futuras
      
      Algunas mejoras que se podrían considerar para el proyecto incluyen:

         Implementar la funcionalidad completa de inicio de sesión y registro con autenticación de usuarios.
         Mejorar la experiencia del usuario en dispositivos móviles.
         Añadir más ubicaciones y funcionalidades relacionadas con los destinos turísticos locales.
         Refinar el diseño y la usabilidad de la interfaz de usuario.





