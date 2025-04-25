const MENSAJES_AUTENTICACION = require('@altertex/util/const/mensajesAutenticacion');

/**
 * Middleware que valida una API key enviada en los headers de la solicitud.
 *
 * Si el header especificado no contiene una clave válida, se responde con un error 401.
 *
 * @param {string} [nombreHeader='x-api-key'] - Nombre del header que se debe verificar.
 * @returns {function(Express.Request, Express.Response, Express.NextFunction): void} Middleware de Express que valida la API key.
 */
module.exports = (nombreHeader = 'x-api-key') => {
  /**
   * Middleware que compara la clave del header con `process.env.API_KEY`.
   *
   * @param {Express.Request} req - Objeto de solicitud de Express.
   * @param {Express.Response} res - Objeto de respuesta de Express.
   * @param {Express.NextFunction} next - Función para continuar con el siguiente middleware.
   * @returns {void}
   */
  return (req, res, next) => {
    const valorHeader = req.get(nombreHeader);

    if (!valorHeader || valorHeader !== process.env.API_KEY) {
      return res
        .status(MENSAJES_AUTENTICACION.API_KEY_INVALIDA.codigo)
        .json({ mensaje: MENSAJES_AUTENTICACION.API_KEY_INVALIDA.mensaje });
    }

    next();
  };
};
