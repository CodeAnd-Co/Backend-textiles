const mysql = require("mysql2");

/**
 * Establece una conexión con una base de datos MySQL utilizando las credenciales definidas
 * en las variables de entorno. La conexión se realiza con soporte para caracteres UTF-8 multibyte.
 *
 * @module conexionMySQL
 * @requires mysql2
 *
 * @const {object} conexion - Objeto de conexión MySQL activo.
 * @property {function} connect - Método para establecer la conexión con la base de datos.
 *
 * @example
 * const conexion = require('./conexion');
 * conexion.query('SELECT * FROM usuarios', (err, results) => {
 *   if (err) throw err;
 *   console.log(results);
 * });
 *
 * @throws {Error} Si ocurre un error al conectar a la base de datos.
 */

const conexion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: "utf8mb4",
});

conexion.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL:", error.stack);
    return;
  }
  console.log(`Connected to MySQL as id ${conexion.threadId}`);
});

module.exports = conexion;
