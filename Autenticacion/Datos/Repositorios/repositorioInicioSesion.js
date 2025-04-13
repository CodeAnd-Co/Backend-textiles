const correrQuery = require("@altertex/util/ser/correrQuery");
const { USUARIOS } = require("@altertex/util/const/consultasSQL");

/**
 * Obtiene la información y los permisos de un usuario a partir de su correo electrónico.
 *
 * @async
 * @function obtenerUsuario
 * @param {string} correoElectronico - Correo electrónico del usuario a buscar.
 *
 * @returns {Promise<Object|string>} Objeto con la siguiente estructura si se encuentra el usuario:
 * - { infoUsuario: Array<Object>, permisos: Array<string> }
 * - Retorna un string con un mensaje de error si ocurre un fallo durante la operación.
 *
 * @throws {Error} Si no se encuentra el usuario o ocurre un error en la consulta.
 */
exports.obtenerUsuario = async (correoElectronico) => {
  const queryUsuarios = USUARIOS.OBTENER_USUARIO;
  const queryPermisos = USUARIOS.OBTENER_PERMISOS;

  try {
    const usuario = await correrQuery(queryUsuarios, [correoElectronico]);
    const resultadoPermisos = await correrQuery(queryPermisos, [
      correoElectronico,
    ]);

    if (!usuario || usuario.length === 0) {
      throw new Error("Usuario no encontrado");
    }

    const resultado = {
      infoUsuario: usuario,
      permisos: resultadoPermisos.map(
        (objetosPermisos) => objetosPermisos.nombre
      ),
    };

    return resultado;
  } catch (error) {
    return `Error obteniendo usuario: ${error}`;
  }
};
