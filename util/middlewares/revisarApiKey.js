/**
 * @file validarApiKey.js
 * @description Middleware para validar una API key en los headers de la solicitud.
 */

/**
 * Middleware factory que valida si el valor de un header específico coincide con la API key esperada.
 *
 * @param {string} nombreHeader - El nombre del header que contiene la API key (por ejemplo, "x-api-key").
 * @param {string} [mensajeError="Api key invalida"] - Mensaje de error personalizado si la validación falla.
 * @returns {import('express').RequestHandler} Middleware de Express que valida la API key.
 *
 * @example
 * // En un archivo de rutas
 * const validarApiKey = require('./validarApiKey');
 * app.get("/ruta-protegida", validarApiKey("x-api-key"), (req, res) => {
 *   res.send("Acceso autorizado");
 * });
 */
module.exports = (nombreHeader, mensajeError = "Api key invalida") => {
  return (req, res, next) => {
    const valorHeader = req.get(nombreHeader);
    if (valorHeader !== process.env.API_KEY) {
      return res.status(400).json({ mensaje: mensajeError });
    }
    next();
  };
};
