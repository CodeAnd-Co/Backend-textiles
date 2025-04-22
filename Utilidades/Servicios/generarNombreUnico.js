const crypto = require("crypto");
const path = require("path");

/**
 * Genera un nombre de archivo único basado en la fecha actual y un hash aleatorio.
 *
 * Esta función utiliza la fecha actual (en milisegundos desde la época Unix) y una cadena
 * aleatoria generada con `crypto.randomBytes`, preservando la extensión original del archivo.
 *
 * @function generarNombreArchivo
 * @param {string} [nombreOriginal=""] - El nombre original del archivo, utilizado para conservar la extensión.
 *
 * @returns {string} Un nuevo nombre de archivo único, con la misma extensión que el original.
 *
 * @example
 * const nombre = generarNombreArchivo("foto.png");
 * console.log(nombre); // "1713804721345-a1b2c3d4e5f6g7h8.png"
 */

module.exports = (nombreOriginal = "") => {
  const ext = path.extname(nombreOriginal);
  const randomBytes = crypto.randomBytes(16).toString("hex");
  return `${Date.now()}-${randomBytes}${ext}`;
};
