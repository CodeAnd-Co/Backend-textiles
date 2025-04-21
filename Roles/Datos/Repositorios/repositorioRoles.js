// Importa la función para ejecutar queries SQL a la base de datos
const correrQuery = require("@altertex/util/ser/correrQuery");
// Importa las consultas SQL relacionadas con roles
const CONSULTAS_ROLES = require("@altertex/util/const/consultasRoles");

/**
 * RF7 - Consultar lista de roles - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF7
 *
 * @async
 * @function obtenerRoles
 * @param {number} limit - Cantidad máxima de resultados a obtener.
 * @param {number} offset - Número de registros a omitir desde el inicio.
 * @returns {Promise<Array<Object>>} Lista de roles o arreglo vacío si ocurre un error.
 */
exports.obtenerRoles = async (limit, offset) => {
  const query = CONSULTAS_ROLES.OBTENER_LISTA;

  try {
    // Ejecuta la consulta SQL con los parámetros proporcionados
    const roles = await correrQuery(query, [limit, offset]);

    // Verifica si la respuesta está vacía
    if (!roles || roles.length === 0) {
      throw new Error("No hay roles registrados");
    }

    return roles;
  } catch (error) {
    // Muestra un mensaje de error en consola si ocurre un fallo
    console.error("Error al obtener roles:", error);
    return [];
  }
};