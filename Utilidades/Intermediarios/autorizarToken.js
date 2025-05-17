const jwt = require('jsonwebtoken');
const MENSAJES_AUTENTICACION = require('@altertex/util/const/mensajesAutenticacion');

/**
 * Middleware que verifica la validez del token JWT en las cookies del cliente.
 *
 * Si el token no está presente, ha expirado o no es válido, se envía un error apropiado.
 *
 * @param {Express.Request} req - Objeto de solicitud de Express.
 * @param {Express.Response} res - Objeto de respuesta de Express.
 * @param {Express.NextFunction} next - Función para continuar con el siguiente middleware.
 * @returns {Promise<void>} Middleware de Express para autenticación por token.
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
    if (error.name === 'TokenExpiredError') {
      return res
        .status(MENSAJES_AUTENTICACION.TOKEN_EXPIRADO.codigo)
        .json({ mensaje: MENSAJES_AUTENTICACION.TOKEN_EXPIRADO.mensaje });
    }

    if (error.name === 'JsonWebTokenError') {
      return res
        .status(MENSAJES_AUTENTICACION.TOKEN_INVALIDO.codigo)
        .json({ mensaje: MENSAJES_AUTENTICACION.TOKEN_INVALIDO.mensaje });
    }

    return res
      .status(MENSAJES_AUTENTICACION.ERROR_VALIDAR_TOKEN.codigo)
      .json({ mensaje: MENSAJES_AUTENTICACION.ERROR_VALIDAR_TOKEN.mensaje });
  }
};
