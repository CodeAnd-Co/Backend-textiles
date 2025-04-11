/**
 * @file validarYSanitizar.js
 * @description Middleware para validar y sanear el cuerpo de las solicitudes POST/PUT, protegiendo contra inyecciones SQL y datos no válidos.
 */

const patronProhibido = /['";`]|(--)/; // Caracteres típicos utilizados en inyecciones SQL

/**
 * Middleware que valida y limpia los datos del cuerpo de la solicitud (`req.body`).
 *
 * - Acepta solo objetos planos (no arrays, no null).
 * - Solo permite valores de tipo string, number o boolean.
 * - Rechaza strings con caracteres potencialmente peligrosos (', ", ;, `, --).
 * - Limpia los strings válidos eliminando espacios al inicio y final.
 *
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @param {import('express').NextFunction} next - Función para pasar al siguiente middleware.
 *
 * @returns {void} - Envía una respuesta con error 400 si la validación falla, o llama a `next()` si es válida.
 *
 * @example
 * app.post("/productos", validarYSanitizar, (req, res) => {
 *   // req.body ya está validado y sanitizado
 * });
 */
function validarYSanitizar(req, res, next) {
  const { body } = req;

  // Verifica que el cuerpo sea un objeto plano
  if (typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ mensaje: "Formato del cuerpo inválido." });
  }

  for (const [llave, valor] of Object.entries(body)) {
    // Solo aceptamos strings, números o booleanos simples
    if (
      typeof valor !== "string"
      && typeof valor !== "number"
      && typeof valor !== "boolean"
    ) {
      return res
        .status(400)
        .json({ mensaje: `Valor inválido para el campo "${llave}".` });
    }

    if (typeof valor === "string") {
      if (patronProhibido.test(valor)) {
        return res
          .status(400)
          .json({ mensaje: `Entrada sospechosa en el campo "${llave}".` });
      }

      // Limpieza básica: quitar espacios al inicio/final
      req.body[llave] = valor.trim();
    }
  }

  next();
}

module.exports = validarYSanitizar;
