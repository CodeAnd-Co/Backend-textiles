/**
 * @file db.js
 * @description Configura y exporta una conexión MySQL utilizando variables de entorno.
 */

const mysql = require("mysql2");

/**
 * Conexión a la base de datos MySQL, configurada con variables de entorno.
 *
 * @type {mysql.Connection}
 */
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // Dirección del servidor MySQL
  user: process.env.DB_USER, // Usuario de la base de datos
  password: process.env.DB_PASSWORD, // Contraseña del usuario
  database: process.env.DB_NAME, // Nombre de la base de datos
  charset: "utf8mb4", // Conjunto de caracteres para soportar emojis y símbolos especiales
});

/**
 * Establece la conexión con la base de datos y maneja errores en caso de que ocurran.
 */
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack);
    return;
  }
  console.log(`Connected to MySQL as id ${connection.threadId}`);
});

/**
 * Exporta la conexión para ser reutilizada en otros módulos.
 *
 * @module connection
 */
module.exports = connection;
