const recibirDatosSQL = require("../../../util/services/recibirDatosSQL");
const correrQuery = require("../../../util/services/correrQuery");
const consultas = require("../../../util/Consultas/Clientes/consultasClientes");

/**
 * Obtiene la información de un usuario por su correo electrónico, junto con sus permisos asociados.
 *
 * - Utiliza la tabla `usuario` para obtener los datos del usuario.
 * - Ejecuta una consulta adicional para obtener los permisos del usuario según sus roles.
 * - Devuelve un objeto con los datos del usuario y un array de nombres de permisos.
 *
 * @async
 * @function obtenerUsuario
 * @param {string} correoElectronico - El correo electrónico del usuario a buscar.
 * @returns {Promise<{infoUsuario: Object, permisos: string[]}|string>} Un objeto con la información del usuario y sus permisos,
 * o un mensaje de error si ocurre una excepción.
 */
exports.obtenerUsuario = async (correoElectronico) => {
  const query = consultas.obtenerPermisos;
  try {
    const usuario = await recibirDatosSQL("usuario", { correoElectronico });
    const resultadoPermisos = await correrQuery(query, [correoElectronico]);

    const resultado = {
      infoUsuario: usuario,
      permisos: resultadoPermisos.map(
        (objetosPermisos) => objetosPermisos.permiso
      ),
    };

    return resultado; // Retorna el usuario con sus permisos
  } catch (error) {
    return `Error obteniendo usuario: ${error}`;
  }
};
