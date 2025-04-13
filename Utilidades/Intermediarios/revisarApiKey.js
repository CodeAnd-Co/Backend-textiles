const MENSAJES_AUTENTICACION = require("@altertex/util/const/mensajesAutenticacion");

/**
 * Middleware que valida la API Key enviada en los headers de la solicitud.
 * Compara el valor del header con el valor definido en la variable de entorno `API_KEY`.
 *
 * @function
 * @param {string} [nombreHeader="x-api-key"] - Nombre del header que contiene la API Key.
 *
 * @returns {Function} Middleware de Express que valida la API Key.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función que llama al siguiente middleware si la API Key es válida.
 *
 * @returns {Response|void} - Respuesta HTTP:
 * - 401 si la API Key es inválida o no se proporciona.
 *
 * @throws {Error} - Si ocurre un error inesperado durante la validación (muy raro en este caso).
 */

module.exports = (nombreHeader = "x-api-key") => {
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
