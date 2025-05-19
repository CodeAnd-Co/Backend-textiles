const pool = require('@altertex/util/bd/db');

/**
 * Ejecuta una consulta SQL utilizando el pool de conexiones MySQL.
 *
 * @async
 * @function
 * @param {string} query - Consulta SQL a ejecutar.
 * @param {Array} [params=[]] - Parámetros para la consulta preparada.
 * @param {object} [conexion=null] - Conexión existente (opcional) para transacciones.
 * @returns {Promise<any>} Promesa que se resuelve con los resultados de la consulta.
 */
module.exports = async (query, params = [], conexion = null) => {
  try {

    const conn = conexion || pool;
    const [results] = await conn.query(query, params);
    return results;
  } catch (error) {
    console.error('Error en correrQuery:', error); // importante para debug
    throw new Error("Ocurrió un error al ejecutar la query");
  }
};
