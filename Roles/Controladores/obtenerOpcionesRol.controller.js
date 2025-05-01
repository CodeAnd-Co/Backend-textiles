const repositorio = require('@altertex/rol/repos/obtenerOpcionesRolRepositorio');
const MENSAJES = require('@altertex/util/const/mensajesRoles');

/**
 * Controlador para obtener la lista de permisos disponibles para asociar a un rol.
 *
 * Este endpoint se utiliza generalmente cuando se va a crear o editar un rol,
 * y se necesita mostrar las opciones de permisos disponibles en el sistema.
 *
 * @async
 * @function obtenerOpcionesRol
 * @param {Express.Request} req - Objeto de solicitud HTTP (no se espera ningún parámetro específico).
 * @param {Express.Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta JSON con el estado y la lista de permisos.
 */
exports.obtenerOpcionesRol = async (req, res) => {
  try {
    const resultado = await repositorio.obtenerPermisos();
    return res.status(200).json({
      mensaje: MENSAJES.PERMISOS_OBTENIDOS,
      resultado,
    });
  } catch (error) {
    console.error('Error obteniendo permisos:', error);
    return res.status(500).json({
      mensaje: MENSAJES.ERROR_OBTENIENDO_PERMISOS,
    });
  }
};
