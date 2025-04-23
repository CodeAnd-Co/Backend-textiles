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
const MENSAJES = require("@altertex/util/const/mensajesCuotas");

exports.validarCuotaSet = (nombre, productosYLimite, res) => {
  if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
    return res.status(400).json({ error: MENSAJES.NOMBRE_REQUERIDO });
  }

  if (!Array.isArray(productosYLimite) || productosYLimite.length === 0) {
    return res.status(400).json({ error: MENSAJES.PRODUCTOS_REQUERIDOS });
  }

  for (let i = 0; i < productosYLimite.length; i++) {
    const { idProducto, limite, limiteActual } = productosYLimite[i];

    if (
      !idProducto ||
      typeof idProducto !== "string" ||
      idProducto.trim() === ""
    ) {
      return res.status(400).json({ error: MENSAJES.ID_PRODUCTO_INVALIDO(i) });
    }

    if (typeof limite !== "number" || isNaN(limite)) {
      return res
        .status(400)
        .json({ error: MENSAJES.LIMITE_INVALIDO(idProducto) });
    }

    if (typeof limiteActual !== "number" || isNaN(limiteActual)) {
      return res
        .status(400)
        .json({ error: MENSAJES.LIMITE_ACTUAL_INVALIDO(idProducto) });
    }
  }
};
