const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_USUARIOS = require('@altertex/util/const/consultasUsuarios');

/**
 * Consulta si existen usuarios protegidos dentro de una lista de IDs.
 * @param {number[]} idsUsuarios - Lista de IDs a verificar
 * @returns {Promise<object[]>} Lista de usuarios protegidos encontrados
 */
exports.consultarUsuariosProtegidos = async (idsUsuarios) => {
  try {
    const resultado = await correrQuery(
      CONSULTAS_USUARIOS.CONSULTAR_USUARIOS_PROTEGIDOS,
      [idsUsuarios]
    );
    return resultado;
  } catch (error) {
    console.error('Error en consultarUsuariosProtegidos:', error);
    throw new Error('Error consultando usuarios protegidos');
  }
};