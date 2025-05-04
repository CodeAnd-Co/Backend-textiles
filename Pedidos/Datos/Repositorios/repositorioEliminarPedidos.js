const conexion = require('@altertex/util/bd/db');
const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_PEDIDOS = require('@altertex/util/const/consultasPedidos');

/**
 * Elimina las opciones asociadas a un pedido.
 * //RF[63] Elimina pedido - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF63]
 * @async
 * @function eliminarPedidoConTransaccion
 * @param {number} idPedido - ID del pedido a eliminar.
 * @returns {Promise<object>} Objeto de resultado de la operación MySQL (por ejemplo, `affectedRows`).
 * @throws {Error} Si ocurre un error durante la ejecución de la transacción.
 */
exports.eliminarPedido = async (idPedido) => {
  try {
    // Eliminar las opciones asociadas al pedido
    const resultadoOpciones = await correrQuery(
      CONSULTAS_PEDIDOS.ELIMINAR_PEDIDO_OPCION,
      [idPedido],
      conexion
    );

    // Eliminar la relación entre empleados y el pedido
    const resultadoEmpleados = await correrQuery(
      CONSULTAS_PEDIDOS.ELIMINAR_EMPLEADO_PEDIDO,
      [idPedido],
      conexion
    );

    // Eliminar el pedido
    const resultadoPedido = await correrQuery(
      CONSULTAS_PEDIDOS.ELIMINAR_PEDIDO,
      [idPedido],
      conexion
    );

    if (resultadoPedido.affectedRows === 0) {
      throw new Error(`Pedido con ID ${idPedido} no encontrado`);
    }

    // Confirmar la transacción
    await conexion.commit();
    return {
      mensaje: 'Pedido eliminado correctamente',
      resultadoOpciones,
      resultadoEmpleados,
      resultadoPedido,
    };
  } catch (error) {
    // Revertir la transacción en caso de error
    await conexion.rollback();
    console.error('Error al eliminar pedido con transacción:', error);
    throw error;
  } finally {
    // Liberar la conexión
    await conexion.release();
  }
};
