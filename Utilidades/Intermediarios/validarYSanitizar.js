/**
 * @file validarInyeccionSQL.js
 * @description Middleware para detectar posibles intentos de inyección SQL en solicitudes POST/PUT. Si se detecta, responde con un mensaje genérico.
 */

const patronSQL = /(\b(SELECT|INSERT|DELETE|UPDATE|DROP|UNION|--|;|'|"|`)\b|\bOR\b|\bAND\b)/i;

/**
 * Middleware que analiza las cadenas del cuerpo (`req.body`) para detectar patrones de inyección SQL.
 *
 * @param {Express.Request} req - Objeto de solicitud de Express.
 * @param {Express.Response} res - Objeto de respuesta de Express.
 * @param {Express.NextFunction} next - Función para pasar al siguiente middleware.
 *
 * @returns {void}
 */
function validarInyeccionSQL(req, res, next) {
  const cuerpo = req.body;

  for (const valor of Object.values(cuerpo)) {
    if (typeof valor === 'string' && patronSQL.test(valor)) {
      return res.status(400).json({
        mensaje: 'Entrada sospechosa detectada, por favor intente de nuevo.',
      });
    }
  }

  next();
}

module.exports = validarInyeccionSQL;
