// Importación del repositorio de roles y los mensajes constantes relacionados a la funcionalidad de roles.
const repositorio = require('@altertex/rol/repos/repositorioRoles');
const MENSAJES_ROLES = require('@altertex/util/const/mensajesRoles');

/**
 * Controlador para consultar la lista de roles.
 *
 * @function consultarLista
 * @async
 * @param {Object} req - Objeto de solicitud HTTP (Request).
 * @param {Object} res - Objeto de respuesta HTTP (Response).
 * @returns {Response} Respuesta HTTP con el resultado de la consulta.
 *
 * @description
 * Este controlador realiza una consulta al repositorio de roles para obtener
 * la lista completa. Si no se encuentran resultados, responde con el código y mensaje
 * correspondiente a resultados vacíos. En caso de éxito, devuelve la lista con un mensaje
 * de éxito. Ante cualquier error inesperado, devuelve un error 500.
 */
exports.consultarLista = async (req, res) => {
  try {
    // Se consulta al repositorio de roles para obtener todos los registros.
    const resultados = await repositorio.obtenerRoles();

    // Validación: si no se encontraron resultados, se responde con el mensaje de "sin resultados".
    if (!resultados || resultados.length === 0) {
      return res
        .status(MENSAJES_ROLES.SIN_RESULTADOS.codigo)
        .json({ mensaje: MENSAJES_ROLES.SIN_RESULTADOS.mensaje });
    }

    // En caso de éxito, se responde con el mensaje correspondiente y los datos encontrados.
    return res.status(MENSAJES_ROLES.CONSULTA_EXITOSA.codigo).json({
      mensaje: MENSAJES_ROLES.CONSULTA_EXITOSA.mensaje,
      roles: resultados,
    });
  } catch (error) {
    // Manejo de errores inesperados, con log en consola para facilitar el diagnóstico.
    console.error(
      'Error inesperado al consultar roles:',
      error.message || error,
    );

    // Se responde con un error 500 y un mensaje genérico para el cliente.
    return res.status(500).json({ mensaje: 'Error al consultar roles' });
  }
};