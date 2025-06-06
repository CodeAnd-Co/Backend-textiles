const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS = require('@altertex/util/const/consultasCategorias');

/**
 * Actualiza el nombre, descripción y productos de una categoría.
 *
 * @param {object} categoria - Objeto con los datos de la categoría.
 * @param {number} categoria.idCategoria - ID de la categoría a actualizar.
 * @param {string} categoria.nombreCategoria - Nuevo nombre de la categoría.
 * @param {string} categoria.descripcion - Nueva descripción.
 * @param {number[]} categoria.productos - IDs de productos asociados.
 * @returns {Promise<void>}
 */
exports.actualizarCategoria = async ({ idCategoria, nombreCategoria, descripcion, productos }) => {
  await correrQuery(CONSULTAS.ACTUALIZAR_CATEGORIA, [nombreCategoria, descripcion, idCategoria]);
  await correrQuery(CONSULTAS.ELIMINAR_PRODUCTOS_CATEGORIA, [idCategoria]);

  if (productos && productos.length > 0) {
    const valores = productos.map((idProd) => [idCategoria, idProd]);
    await correrQuery(CONSULTAS.ASIGNAR_PRODUCTOS_A_CATEGORIA, [valores]);
  }
};