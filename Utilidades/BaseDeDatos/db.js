const mysql = require('mysql2/promise');

/**
 * Establece un pool de conexiones con una base de datos MySQL utilizando las credenciales definidas
 * en las variables de entorno. Incluye verificación inicial de conexión y soporte para UTF-8 multibyte.
 *
 * @module conexionMySQL
 * @requires mysql2/promise
 *
 * @constant {object} pool - Pool de conexiones MySQL.
 * @property {Function} query - Método para realizar consultas a la base de datos.
 */

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, // elimina espacios accidentales
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000, // 10 segundos
});

// Verificar conexión inicial una vez al arrancar
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log(`Conectado a MySQL con id ${connection.threadId}`);
    connection.release(); // libera la conexión al pool
  } catch (error) {
    console.error('Error conectandose a MySQL:', error.stack);
  }
})();

module.exports = pool;
