/**
 * Limpia el texto eliminando acentos, caracteres especiales y lo convierte a mayúsculas.
 * @param {string} texto - El texto a limpiar.
 * @returns {string} El texto limpio.
 */
const limpiarTexto = (texto) =>
  (typeof texto === 'string' ? texto : '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .toUpperCase();

/**
 * Obtiene un código basado en el texto proporcionado, usando la primera palabra que cumpla la longitud mínima.
 * @param {string} texto - El texto del que se extraerá el código.
 * @param {number} [longitud=3] - La longitud mínima del código a extraer.
 * @returns {string} El código generado a partir del texto.
 */
const obtenerCodigo = (texto, longitud = 3) => {
  const palabras = limpiarTexto(texto).split(' ');
  for (const palabra of palabras) {
    if (palabra.length >= longitud) return palabra.substring(0, longitud);
  }
  return limpiarTexto(texto).substring(0, longitud);
};


/**
 * Genera un SKU basado en el nombre del producto, variante y valor de opción.
 * @param {string} nombreProducto - El nombre del producto.
 * @param {string} nombreVariante - El nombre de la variante.
 * @param {string} valorOpcion - El valor de la opción.
 * @returns {string} El SKU generado.
 */
const generarSKU = (nombreProducto, nombreVariante, valorOpcion) => {
  try {
    const prefijo = obtenerCodigo(nombreProducto);
    const codigoVariante = obtenerCodigo(nombreVariante);
    const codigoOpcion = obtenerCodigo(valorOpcion);
    return `${prefijo}-${codigoVariante}-${codigoOpcion}`;
  } catch {
    console.error('Error generando SKU:', { nombreProducto, nombreVariante, valorOpcion });
    return 'SKU-ERROR';
  }
};

/**
 * Crea una función generadora de SKUs consecutivos basada en los parámetros dados.
 * @returns {function(string, string, string): string} Función que genera un SKU único e incremental.
 */
const crearGeneradorSKUConsecutivo = () => {
  const contadorSKU = new Map();

  return (nombreProducto, nombreVariante, valorOpcion) => {
    const base = generarSKU(nombreProducto, nombreVariante, valorOpcion);
    const actual = contadorSKU.get(base) || 0;
    const siguiente = actual + 1;
    contadorSKU.set(base, siguiente);

    return `${base}-${String(siguiente).padStart(3, '0')}`;
  };
};

module.exports = {
  generarSKU,                  // solo base
  crearGeneradorSKUConsecutivo // base + numeración incremental
};
