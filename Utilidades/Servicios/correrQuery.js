const conexion = require("@altertex/util/bd/db");

/**
 * Ejecuta una consulta SQL en la base de datos y devuelve los resultados.
 * Si ocurre un error durante la consulta, rechaza la promesa con un mensaje de error.
 *
 * @async
 * @function correrQuery
 * @param {string} query - La consulta SQL a ejecutar.
 * @param {Array} [parametros=[]] - Los parámetros a incluir en la consulta SQL.
 *
 * @returns {Promise<Array>} Una promesa que se resuelve con los resultados de la consulta.
 *
 * @throws {Error} - Si el query no es válido, no se encuentran resultados, o si ocurre un error en la ejecución de la consulta.
 * - Error si el `query` no es una cadena de texto.
 * - Error si no se encuentran resultados o si la consulta falla.
 */

module.exports = async (query, parametros = []) => {
  return new Promise((resolver, rechazar) => {
    if (!query || typeof query !== "string") {
      rechazar(new Error("El query no es válido."));
      return;
    }

    conexion.query(query, parametros, (error, resultados) => {
      if (error) {
        console.error("Error en la consulta:", error);
        rechazar(
          new Error(`Error en la consulta: ${error.message || "Desconocido"}`)
        );
      } else {
        if (!resultados || resultados.length === 0) {
          rechazar(new Error("No se encontraron resultados."));
        } else {
          resolver(resultados);
        }
      }
    });
  });
};
