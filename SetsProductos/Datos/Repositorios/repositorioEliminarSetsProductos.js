const db = require('@altertex/util/bd/db');
const CONSULTAS_SETS_PRODUCTOS = require('@altertex/util/const/consultasSetsProductos');

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
  const conexion = await db.getConnection();

  try {
    await conexion.beginTransaction();

    const [resultadoSetGrupo] = await conexion.query(
      CONSULTAS_SETS_PRODUCTOS.ELIMINAR_SET_PRODUCTOS_GRUPO_EMPLEADOS,
      [idSetProducto]
    );

    const [resultadoProductosSetProductos] = await conexion.query(
      CONSULTAS_SETS_PRODUCTOS.ELIMINAR_PRODUCTOS_SET_PRODUCTOS,
      [idSetProducto]
    );

    const [resultadoSetProductos] = await conexion.query(
      CONSULTAS_SETS_PRODUCTOS.ELIMINAR_SET_PRODUCTOS,
      [idSetProducto]
    );

    if (resultadoSetProductos.affectedRows === 0) {
      throw new Error(`Set de productos con ID ${idSetProducto} no encontrado`);
    }

    // Confirmar la transacción
    await conexion.commit();

    return {
      mensaje: 'Set de productos eliminado correctamente',
      resultadoSetGrupo,
      resultadoProductosSetProductos,
      resultadoSetProductos,
    };
  } catch (error) {
    await conexion.rollback();
    throw new Error('Error eliminando set de productos');
  } finally {
    if (conexion) conexion.release();
  }
};