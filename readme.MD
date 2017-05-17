# Backend

### Requerimientos
  1. Tener nodeJS instalado.

### Instrucciones de instalación
  1. Clonar el proyecto en el directorio de su preferencia.
  2. Ejecutar en consola el comando `npm install` para instalar todas las dependencias requeridas.
  3. En otra pestaña de consola, ejecutar `mongod` para levantar una instancia de mongoDB.
  4. Crear archivo config.js
  5. Ejecutar en consola el comando `npm start`. Se configurarán automáticamente las variables de entorno necesarias.
  6. Deberia ver en consola el siguiente mensaje: "Connected to database. Server Up and Running".

### Archivo config.js:
  1. Crear en el directorio raíz del proyecto un archivo config.js con la siguiente estructura:
  ```
  module.exports = {
    port: 3000,
    db:  URL a la base de datos. Ejemplo: 'mongodb://localhost:27017/dbtest'
  };
  ```
# Frontend

### Requerimientos
 1. Server web configurado.

### Instrucciones de instalación
  1. Clonar el proyecto [frontend](https://github.com/m0ises2/frontEndProject.git) dentro del servidor web.
  2. Acceder a la dirección del servidor. En caso de no tener un servidor web configurado, lea la sección dedicada a este tema.

### Credenciales para inicio de sesión
    Client ID: m0ises2
    Email: moisesalvarado84@gmail.com
    Password: 20700696

### Configuración de un Servidor Web

#### Ambiente Windows
  1. Descargar e instalar [extensión Web Server](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb) para [Google Chrome](https://www.google.com/chrome/browser/desktop/).
  2. Ejecutar la extensión.
  3. Indicar a la extensión el directorio donde se encuentra el proyecto frontend.
  4. Iniciar el servidor web.
  5. Acceder a cualquier URL disponible en la extensión.

#### Ambiente Linux

  1. Instalar librería [http-server](https://www.npmjs.com/package/http-server)
  2. Navegar en la consola hasta el directorio donde se clonó el proyecto.
  3. Ejecutar el comando `http-server`.
  4. Por defecto, la dirección 127.0.0.1:8080 tendrá disponible el proyecto frontend.
