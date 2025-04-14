/**
 * Ejecuta una consulta SQL utilizando la conexión a la base de datos.
 *
 * @async
 * @function
 * @param {string} query - Consulta SQL a ejecutar.
 * @param {Array} [params=[]] - Parámetros para la consulta preparada.
 * @returns {Promise<any>} Promesa que se resuelve con los resultados de la consulta o se rechaza con un error.
 *
 * @example
 * const resultados = await runQuery('SELECT * FROM usuarios WHERE id = ?', [1]);
 */

const conexion = require("../Database/db");

module.exports = async (query, params = []) => {
  return new Promise((resolver, rechazar) => {
    conexion.query(query, params, (err, results) => {
      if (err) {
        rechazar(err);
      } else {
        resolver(results);
      }
    });
  });
};
