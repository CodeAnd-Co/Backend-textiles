const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_USUARIOS = require('@altertex/util/const/consultasUsuarios');

/**
 * Obtiene un usuario desde la base de datos mediante su ID.
 *
 * Ejecuta una consulta SQL y retorna el primer usuario encontrado o `null` si no existe.
 *
 * @param {number|string} idUsuario - ID del usuario a buscar.
 * @returns {Promise<object|null>} El usuario encontrado o `null` si no existe.
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 */
exports.obtenerUsuarioPorId = async (idUsuario) => {
  const query = CONSULTAS_USUARIOS.LEER_USUARIO;

  try {
    const resultado = await correrQuery(query, [idUsuario]);
    return resultado.length > 0 ? resultado[0] : null;
  } catch (error) {
    console.error('Error al obtener el usuario por id:', error);
    throw error;
  }
};
