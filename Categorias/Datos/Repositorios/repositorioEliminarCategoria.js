const correrQuery = require("@altertex/util/ser/correrQuery");
const CONSULTAS_CATEGORIAS = require("@altertex/util/const/consultasCategorias");

/**
 * Elimina la relación entre productos y una categoría, y/o la categoría en sí, de la base de datos.
 * RF[50] - Elimina categoría de productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF50
 *
 * @async
 * @function eliminarProductoCategoria
 * @param {number} idCategoria - ID de la categoría a desvincular de productos.
 * @returns {Promise<Object>} Objeto de resultado de la operación MySQL (por ejemplo, `affectedRows`).
 * @throws {Error} Si ocurre un error durante la ejecución del query para eliminar la relación.
 *
 * @async
 * @function eliminarCategoria
 * @param {number} idCategoria - ID de la categoría a eliminar completamente de la base de datos.
 * @returns {Promise<Object>} Objeto de resultado de la operación MySQL (por ejemplo, `affectedRows`).
 * @throws {Error} Si ocurre un error durante la ejecución del query para eliminar la categoría.
 *
 * @description
 * Utiliza `correrQuery` para ejecutar las consultas definidas en `CONSULTAS_CATEGORIAS.ELIMINAR_CATEGORIA`.
 * Se espera que la eliminación de categoria_producto se haga antes de eliminar la categoría en sí.
 */

exports.eliminarProductoCategoria = async (idCategoria) => {
  const query = CONSULTAS_CATEGORIAS.ELIMINAR_CATEGORIA_PRODUCTO;
  try {
    const resultado = await correrQuery(query, [idCategoria]);
    return resultado;
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    throw error;
  }
};

exports.eliminarCategoria = async (idCategoria) => {
  const query = CONSULTAS_CATEGORIAS.ELIMINAR_CATEGORIA;
  try {
    const resultado = await correrQuery(query, [idCategoria]);
    return resultado;
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    throw error;
  }
};
