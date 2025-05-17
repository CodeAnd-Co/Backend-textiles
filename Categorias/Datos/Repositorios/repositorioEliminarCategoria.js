const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_CATEGORIAS = require('@altertex/util/const/consultasCategorias');

/**
 * Elimina la relación entre productos y una categoría.
 *
 * @async
 * @function eliminarProductoCategoria
 * @param {number} idCategoria - ID de la categoría a desvincular de productos.
 * @returns {Promise<object>} Objeto de resultado de la operación MySQL (por ejemplo, `affectedRows`).
 * @throws {Error} Si ocurre un error durante la ejecución del query para eliminar la relación.
 */
exports.eliminarProductoCategoria = async (idCategoria) => {
  const query = CONSULTAS_CATEGORIAS.ELIMINAR_CATEGORIA_PRODUCTO;
  try {
    const resultado = await correrQuery(query, [idCategoria]);
    return resultado;
  } catch {
    throw new Error('Error eliminando el producto enlazado a la categoria');
  }
};

/**
 * Elimina una categoría de la base de datos.
 *
 * @async
 * @function eliminarCategoria
 * @param {number} idCategoria - ID de la categoría a eliminar.
 * @returns {Promise<{affectedRows: number}>} Resultado de la operación con el número de filas afectadas.
 * @throws {Error} Si ocurre un error durante la operación.
 */
exports.eliminarCategoria = async (idCategoria) => {
  const query = CONSULTAS_CATEGORIAS.ELIMINAR_CATEGORIA;
  try {
    const resultado = await correrQuery(query, [idCategoria]);
    return resultado;
  } catch {
    throw new Error('Error eliminando categorias.');
  }
};
