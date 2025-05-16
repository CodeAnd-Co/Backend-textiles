/**
 *
 * RF31 - Crear Cuotas - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF31
 *
 * Valida los datos de un conjunto de cuotas (cuotaSet), asegurando que el nombre
 * y la lista de productos con sus respectivos límites sean válidos.
 *
 * Esta función lanza errores HTTP utilizando `res.status().json()` si detecta
 * algún problema en los datos recibidos.
 *
 * @function validarCuotaSet
 * @param {string} nombre - Nombre del conjunto de cuotas.
 * @param {Array<Object>} productosYLimite - Lista de productos con sus límites.
 * @param {string} productosYLimite[].idProducto - ID del producto.
 * @param {number} productosYLimite[].limite - Límite máximo asignado al producto.
 * @param {number} productosYLimite[].limiteActual - Límite actual usado del producto.
 * @returns {void}
 *
 * @throws Retorna una respuesta HTTP 400 si:
 * - El nombre es inválido.
 * - La lista de productos está vacía o mal formada.
 * - Algún producto tiene campos inválidos.
 *
 * @note Esta función depende implícitamente de `res`, pero no se pasa como parámetro.
 * Para que sea reutilizable, se recomienda lanzar errores o retornar un objeto de error en lugar de usar `res` directamente.
 */
const MENSAJES = require('@altertex/util/const/mensajesCuotas');

function validarCuotaSet(nombre, productosYLimite) {
  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
    return MENSAJES.NOMBRE_REQUERIDO;
  }

  if (!Array.isArray(productosYLimite) || productosYLimite.length === 0) {
    return MENSAJES.PRODUCTOS_REQUERIDOS;
  }

  for (let iterador = 0; iterador < productosYLimite.length; iterador = iterador + 1) {
    const { idProducto, limite, limiteActual } = productosYLimite[iterador];

    if (!idProducto || typeof idProducto !== 'string' || idProducto.trim() === '') {
      return MENSAJES.ID_PRODUCTO_INVALIDO(iterador);
    }

    // Rechazar strings numéricos con ceros a la izquierda
    if (
      (typeof limite === 'string' && /^0[0-9]+$/.test(limite)) ||
      (typeof limiteActual === 'string' && /^0[0-9]+$/.test(limiteActual))
    ) {
      return 'No se permiten ceros a la izquierda en los valores de cuota.';
    }

    if (typeof limite !== 'number' || isNaN(limite) || !Number.isInteger(limite) || limite <= 0) {
      return MENSAJES.LIMITE_INVALIDO(idProducto);
    }

    if (
      typeof limiteActual !== 'number' ||
      isNaN(limiteActual) ||
      !Number.isInteger(limiteActual) ||
      limiteActual <= 0
    ) {
      return MENSAJES.LIMITE_ACTUAL_INVALIDO(idProducto);
    }
  }

  // Si todo está bien, retorna null
  return null;
}

module.exports = { validarCuotaSet };
