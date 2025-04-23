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
exports.validarCuotaSet = (nombre, productosYLimite, res) => {
  // Validaciones principales
  if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
    return res.status(400).json({ error: 'El campo "nombre" es obligatorio.' });
  }

  if (!Array.isArray(productosYLimite) || productosYLimite.length === 0) {
    return res
      .status(400)
      .json({ error: "Debes enviar al menos un producto con su límite." });
  }

  // Validar cada producto
  for (let iterador = 0; iterador < productosYLimite.length; iterador += 1) {
    const producto = productosYLimite[iterador];
    const { idProducto, limite, limiteActual } = producto;

    if (
      !idProducto ||
      typeof idProducto !== "string" ||
      idProducto.trim() === ""
    ) {
      return res.status(400).json({
        error: `El producto en la posición ${iterador} no tiene un idProducto válido.`,
      });
    }

    if (typeof limite !== "number" || isNaN(limite)) {
      return res.status(400).json({
        error: `El producto "${idProducto}" tiene un "limite" inválido.`,
      });
    }

    if (typeof limiteActual !== "number" || isNaN(limiteActual)) {
      return res.status(400).json({
        error: `El producto "${idProducto}" tiene un "limiteActual" inválido.`,
      });
    }
  }
};
