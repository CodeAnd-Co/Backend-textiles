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

function contieneInyeccionSQL(obj) {
  if (typeof obj === 'string'){
    return patronSQL.test(obj);
  } else if (Array.isArray(obj)) {
    return obj.some(contieneInyeccionSQL);
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.values(obj).some(contieneInyeccionSQL);
  }
  return false;
}


function validarInyeccionSQL(req, res, next) {
  const cuerpo = req.body;
  console.log('validando y sanitizando');

    if (contieneInyeccionSQL(cuerpo)) {
      return res.status(400).json({
        mensaje: 'Entrada sospechosa detectada, por favor intente de nuevo.',
      });
    }
  next();
}

module.exports = validarInyeccionSQL;

