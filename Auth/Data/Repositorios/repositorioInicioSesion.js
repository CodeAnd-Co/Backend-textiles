const recibirDatosSQL = require("../../../util/services/recibirDatosSQL");
const correrQuery = require("../../../util/services/correrQuery");
const consultas = require("../../../util/Consultas/Clientes/consultasClientes");
/**
 * Obtiene un usuario desde DynamoDB utilizando su correo electrónico.
 *
 * @async
 * @function obtenerUsuario
 * @param {string} correo - Correo electrónico del usuario a buscar.
 * @returns {Promise<Object|string>} Retorna el primer objeto de usuario encontrado,
 * o un mensaje de error si ocurre un fallo.
 *
 * @description
 * Utiliza un índice secundario global para consultar la tabla 'Usuario'
 * en DynamoDB, buscando por el campo 'correoElectronico'.
 */
exports.obtenerUsuario = async (correoElectronico) => {
  try {
    const usuario = await recibirDatosSQL("usuario", { correoElectronico });
    return usuario; // Retorna el primer usuario encontrado
  } catch {
    return "Error obteniendo usuario";
  }
};

/**
 * @function obtenerRoles
 * @description Obtiene los permisos asociados a un usuario dado su correo electrónico.
 * @param {string} correoElectronico - El correo electrónico del usuario cuyo rol y permisos se desean obtener.
 * @returns {Promise<Array>} - Una promesa que se resuelve con una lista de objetos de permisos asociados al usuario.
 *                             Si ocurre un error, se devuelve un array vacío.
 *
 * @example
 * // Ejemplo de uso
 * const roles = await obtenerRoles("usuario@dominio.com");
 * console.log(roles); // [{ permiso: "ADMIN" }, { permiso: "USER" }]
 */
exports.obtenerPermisos = async (correoElectronico) => {
  const query = consultas.obtenerPermisos;

  try {
    const resultados = await correrQuery(query, [correoElectronico]);
    return resultados;
  } catch (error) {
    console.error("Error al obtener roles y permisos:", error);
    return [];
  }
};
