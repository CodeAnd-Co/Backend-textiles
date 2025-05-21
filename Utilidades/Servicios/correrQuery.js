const conexion = require('@altertex/util/bd/db');

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
module.exports = async (query, params = []) => {
  try {
    const [results] = await conexion.query(query, params);
    return results;
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    throw err;
  }
};