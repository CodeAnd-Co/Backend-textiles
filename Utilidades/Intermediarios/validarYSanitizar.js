/**
 * @file validarInyeccionSQL.js
 * @description Middleware para detectar posibles intentos de inyección SQL en solicitudes POST/PUT. Si se detecta, responde con un mensaje genérico.
 */

const patronSQL = /(\b(SELECT|INSERT|DELETE|UPDATE|DROP|UNION|--|;|'|"|`)\b|\bOR\b|\bAND\b)/i;

/**
 * Verifica si un objeto contiene posibles patrones de inyección SQL.
 *
 * @function contieneInyeccionSQL
 * @param {any} obj - Valor a analizar. Puede ser un string, objeto o arreglo.
 * @returns {boolean} Retorna `true` si se detecta un patrón sospechoso, `false` en caso contrario.
 */
function contieneInyeccionSQL(obj) {
  if (typeof obj === 'string') {
    return patronSQL.test(obj);
  } else if (Array.isArray(obj)) {
    return obj.some(contieneInyeccionSQL);
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.values(obj).some(contieneInyeccionSQL);
  }
  return false;
}

/**
 * Middleware que analiza el contenido de `req.body` para detectar patrones de inyección SQL.
 *
 * @function validarInyeccionSQL
 * @param {Express.Request} req - Objeto de solicitud de Express.
 * @param {Express.Response} res - Objeto de respuesta de Express.
 * @param {Express.NextFunction} next - Función para continuar con la siguiente capa de middleware.
 * @returns {void} No retorna nada directamente, pero responde con un 400 si se detecta inyección.
 */
function validarInyeccionSQL(req, res, next) {
  const cuerpo = req.body;

  if (contieneInyeccionSQL(cuerpo)) {
    return res.status(400).json({
      mensaje: 'Entrada sospechosa detectada, por favor intente de nuevo.',
    });
  }
  next();
}

module.exports = validarInyeccionSQL;
