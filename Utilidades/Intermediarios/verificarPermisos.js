const MENSAJES_AUTENTICACION = require("@altertex/util/const/mensajesAutenticacion");

/**
 * Middleware que valida si el usuario autenticado tiene los permisos requeridos.
 * Revisa los permisos del usuario autenticado y los compara con los permisos necesarios
 * para acceder a la ruta solicitada.
 *
 * @function
 * @param {...string} permisosRequeridos - Los permisos requeridos para acceder a la ruta.
 *
 * @returns {Function} Middleware de Express que valida los permisos del usuario.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.user - Usuario autenticado, debe contener un array de permisos.
 * @param {Array<string>} req.user.permisos - Lista de permisos del usuario.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función que llama al siguiente middleware si el usuario tiene los permisos requeridos.
 *
 * @returns {Response|void} - Respuesta HTTP:
 * - 401 si el usuario no está autenticado o no tiene permisos.
 * - 403 si el usuario no tiene acceso a la ruta por falta de permisos.
 *
 * @throws {Error} - Si ocurre un error inesperado durante la validación de permisos.
 */

module.exports = (...permisosRequeridos) => {
  return (req, res, next) => {
    const usuario = req.user;

    if (!usuario || !usuario.permisos) {
      return res
        .status(MENSAJES_AUTENTICACION.USUARIO_NO_AUTENTICADO.codigo)
        .json({
          mensaje: MENSAJES_AUTENTICACION.USUARIO_NO_AUTENTICADO.mensaje,
        });
    }

    const permisosUsuario = usuario.permisos;

    const tienePermiso = permisosRequeridos.every((permiso) =>
      permisosUsuario.includes(permiso)
    );

    if (!tienePermiso) {
      return res
        .status(MENSAJES_AUTENTICACION.ACCESO_NO_AUTORIZADO.codigo)
        .json({ mensaje: MENSAJES_AUTENTICACION.ACCESO_NO_AUTORIZADO.mensaje });
    }

    next();
  };
};
