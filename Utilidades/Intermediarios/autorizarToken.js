const jwt = require("jsonwebtoken");
const MENSAJES_AUTENTICACION = require("@altertex/util/const/mensajesAutenticacion");

/**
 * Middleware que valida el token JWT presente en las cookies del cliente.
 * Si el token es válido, agrega los datos del usuario autenticado al objeto `req.user`.
 *
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.cookies - Cookies de la solicitud HTTP.
 * @param {string} req.cookies.token - Token JWT almacenado en la cookie.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función que llama al siguiente middleware si el token es válido.
 *
 * @returns {Response|void} - Respuesta HTTP en caso de error:
 * - 401 si no se proporciona el token.
 * - 401 si el token está expirado o es inválido.
 * - 500 si ocurre un error al validar el token.
 *
 * @throws {Error} - Si ocurre un error inesperado durante la validación del token.
 */

module.exports = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(MENSAJES_AUTENTICACION.TOKEN_NO_PROPORCIONADO.codigo)
      .json({ mensaje: MENSAJES_AUTENTICACION.TOKEN_NO_PROPORCIONADO.mensaje });
  }

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verificado;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(MENSAJES_AUTENTICACION.TOKEN_EXPIRADO.codigo)
        .json({ mensaje: MENSAJES_AUTENTICACION.TOKEN_EXPIRADO.mensaje });
    }

    if (error.name === "JsonWebTokenError") {
      return res
        .status(MENSAJES_AUTENTICACION.TOKEN_INVALIDO.codigo)
        .json({ mensaje: MENSAJES_AUTENTICACION.TOKEN_INVALIDO.mensaje });
    }
    return res
      .status(MENSAJES_AUTENTICACION.ERROR_VALIDAR_TOKEN.codigo)
      .json({ mensaje: MENSAJES_AUTENTICACION.ERROR_VALIDAR_TOKEN.mensaje });
  }
};
