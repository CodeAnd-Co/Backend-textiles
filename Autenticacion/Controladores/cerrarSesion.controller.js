const MENSAJES_AUTENTICACION = require("@altertex/util/const/mensajesAutenticacion");

/**
 * Controlador para el cierre de sesión de un usuario.
 *
 * @async
 * @function cerrarSesion
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.cookies - Cookies enviadas con la solicitud.
 * @param {string} req.cookies.token - Token JWT almacenado en las cookies.
 * @param {Object} res - Objeto de respuesta de Express.
 *
 * @returns {Response} Respuesta HTTP con estado:
 * - 200 si el cierre de sesión es exitoso.
 * - 400 si no existe una sesión activa (no hay token).
 * - 500 si ocurre un error en el servidor al intentar cerrar la sesión.
 *
 * @throws {Error} Si ocurre un error inesperado durante la operación.
 */
exports.cerrarSesion = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(MENSAJES_AUTENTICACION.SESION_NO_EXISTENTE.codigo)
        .json({ mensaje: MENSAJES_AUTENTICACION.SESION_NO_EXISTENTE.mensaje });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res
      .status(MENSAJES_AUTENTICACION.CIERRE_SESION_EXITOSO.codigo)
      .json({ mensaje: MENSAJES_AUTENTICACION.CIERRE_SESION_EXITOSO.mensaje });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);

    return res
      .status(MENSAJES_AUTENTICACION.ERROR_CIERRE_SESION.codigo)
      .json({ mensaje: MENSAJES_AUTENTICACION.ERROR_CIERRE_SESION.mensaje });
  }
};
