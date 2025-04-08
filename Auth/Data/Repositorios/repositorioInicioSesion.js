const recibirDatosSQL = require("../../../util/services/recibirDatosSQL");

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
