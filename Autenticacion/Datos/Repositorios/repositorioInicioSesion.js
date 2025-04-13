const correrQuery = require("@altertex/util/ser/correrQuery");
const CONSULTAS_USUARIOS = require("@altertex/util/const/consultasUsuarios");

/**
 * Obtiene la información y los permisos de un usuario a partir de su correo electrónico.
 *
 * RF78 - Iniciar Sesion - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF78
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
  const queryUsuarios = CONSULTAS_USUARIOS.OBTENER_USUARIO;
  const queryPermisos = CONSULTAS_USUARIOS.OBTENER_PERMISOS;
  const queryClientesAsociados = CONSULTAS_USUARIOS.OBTENER_CLIENTES_ASOCIADOS;

  try {
    const usuario = await correrQuery(queryUsuarios, [correoElectronico]);
    const resultadoPermisos = await correrQuery(queryPermisos, [
      correoElectronico,
    ]);
    const resultadoClientesAsociados = await correrQuery(
      queryClientesAsociados,
      [correoElectronico]
    );

    const resultado = {
      infoUsuario: usuario,
      permisos: resultadoPermisos.map(
        (objetosPermisos) => objetosPermisos.nombre
      ),
      clientesAsociados: resultadoClientesAsociados.map(
        (objetosClientes) => objetosClientes.idCliente
      ),
    };

    return resultado;
  } catch (error) {
    return `Error obteniendo usuario: ${error}`;
  }
};
