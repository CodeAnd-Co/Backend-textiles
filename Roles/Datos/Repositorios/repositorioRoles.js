// Importa la función para ejecutar queries SQL a la base de datos
const correrQuery = require("@altertex/util/ser/correrQuery");
// Importa las consultas SQL relacionadas con roles
const CONSULTAS_ROLES = require("@altertex/util/const/consultasRoles");

/**
 * RF7 - Consultar lista de roles - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF7
 *
 * @async
 * @function obtenerRoles
 * @returns {Promise<Array<Object>>} Lista de roles o arroja un error si ocurre un problema.
 */
exports.obtenerRoles = async () => {
  const query = CONSULTAS_ROLES.OBTENER_LISTA;

  try {
    const roles = await correrQuery(query);

    if (!roles || roles.length === 0) {
      throw new Error("No hay roles registrados");
    }

    return roles;
  } catch (error) {
    console.error("Error al obtener roles:", error);
    throw new Error("Error al consultar roles");
  }
};