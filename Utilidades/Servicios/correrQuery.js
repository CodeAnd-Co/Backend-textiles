const conexion = require('@altertex/util/bd/db');

/**
 * Ejecuta una consulta SQL utilizando el pool de conexiones MySQL.
 *
 * @async
 * @function
 * @param {string} query - Consulta SQL a ejecutar.
 * @param {Array} [params=[]] - Parámetros para la consulta preparada.
 * @returns {Promise<any>} Promesa que se resuelve con los resultados de la consulta.
 *
 * @example
 * const resultados = await runQuery('SELECT * FROM usuarios WHERE id = ?', [1]);
 */
module.exports = async (query, params = []) => {
  try {
    console.log('Query: ', query)
    console.log("Parametros: ", params)
    const [results] = await conexion.query(query, params);
    return results;
  } catch (error) {
    throw new Error("Ocurrio un error al correr la query");
  }
};
