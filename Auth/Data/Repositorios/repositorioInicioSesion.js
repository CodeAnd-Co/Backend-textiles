const recibirDatosSQL = require("../../../util/services/recibirDatosSQL");
const correrQuery = require("../../../util/services/correrQuery");
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

exports.obtenerRoles = async (correoElectronico) => {
  const query = `
    SELECT 
      r.nombre AS rol
    FROM usuario u
    JOIN usuario_rol ur ON u.idUsuario = ur.idUsuario
    JOIN rol r ON ur.idRol = r.idRol
    WHERE u.correoElectronico = ?;

  `;

  try {
    const resultados = await correrQuery(query, [correoElectronico]);
    return resultados[0];
  } catch (error) {
    console.error("Error al obtener roles y permisos:", error);
    return [];
  }
};
