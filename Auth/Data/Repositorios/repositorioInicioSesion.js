const queryDynamoDB = require("../../../util/services/queryDynamoDB");

const tabla = "Usuario"; // Nombre de la tabla en DynamoDB
const indice = "usuario-index"; // Nombre del índice secundario global
const nombreLlave = "correoElectronico"; // Nombre de la llave de búsqueda

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
exports.obtenerUsuario = async (correo) => {
  try {
    const usuario = await queryDynamoDB(tabla, nombreLlave, correo, indice);
    return usuario[0]; // Retorna el primer usuario encontrado
  } catch {
    return "Error obteniendo usuario";
  }
};
