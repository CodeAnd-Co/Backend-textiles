const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_SETS_PRODUCTOS = require('@altertex/util/const/consultasSetsProductos');

/**
 * Elimina la relación entre productos grupos de empleados y un set de productos.
 *
 * @async
 * @function eliminarSetProductoGrupoEmpleado
 * @param {number} idSetProducto - ID del set de productos a desvincular de grupo empleados.
 * @returns {Promise<object>} Objeto de resultado de la operación MySQL (por ejemplo, `affectedRows`).
 * @throws {Error} Si ocurre un error durante la ejecución del query para eliminar la relación.
 */

exports.eliminarSetProductoGrupoEmpleado = async (idSetProducto) => {
  const query = CONSULTAS_SETS_PRODUCTOS.ELIMINAR_SET_PRODUCTOS_GRUPO_EMPLEADOS;
  try {
    const resultado = await correrQuery(query, [idSetProducto]);
    return resultado;
  } catch (error) {
    console.error('Error al eliminar set de productos de set_producto_grupo_empleado:', error);
    throw error;
  }
};

/**
 * Elimina la relación entre productos y un set de productos.
 *
 * @async
 * @function eliminarProductoSetProducto
 * @param {number} idSetProducto - ID del set de productos a desvincular de producto_set_producto.
 * @returns {Promise<object>} Objeto de resultado de la operación MySQL (por ejemplo, `affectedRows`).
 * @throws {Error} Si ocurre un error durante la ejecución del query para eliminar la relación.
 */
exports.eliminarProductoSetProducto = async (idSetProducto) => {
  const query = CONSULTAS_SETS_PRODUCTOS.ELIMINAR_PRODUCTOS_SET_PRODUCTOS;
  try {
    const resultado = await correrQuery(query, [idSetProducto]);
    return resultado;
  } catch (error) {
    console.error('Error al eliminar set de productos de producto_set_producto:', error);
    throw error;
  }
};

/**
 * Elimina un set de productos de la base de datos.
 *
 * @async
 * @function eliminarSetProducto
 * @param {number} idSetProducto - ID del set de productos a eliminar.
 * @returns {Promise<object>} Objeto de resultado de la operación MySQL (por ejemplo, `affectedRows`).
 * @throws {Error} Si ocurre un error durante la ejecución del query para eliminar el set de productos.
 */
exports.eliminarSetProducto = async (idSetProducto) => {
  const query = CONSULTAS_SETS_PRODUCTOS.ELIMINAR_SET_PRODUCTOS;
  try {
    const resultado = await correrQuery(query, [idSetProducto]);
    return resultado;
  } catch (error) {
    console.error('Error al eliminar set de productos:', error);
    throw error;
  }
};
