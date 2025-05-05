const repositorio = require('@altertex/pedidos/repos/repositorioEliminarPedidos');
const MENSAJES_PEDIDOS = require('@altertex/util/const/mensajesPedidos');

/**
 * Controlador para eliminar pedidos.
 * RF[63] - Elimina pedido - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF63
 *
 * @async
 * @function eliminarPedido
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} req.body - Cuerpo de la solicitud HTTP.
 * @param {number[]} req.body.idsPedido - Array de IDs numéricos de los pedidos a eliminar.
 * @param {object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Respuesta HTTP con estado:
 * - 200 si los pedidos fueron eliminados correctamente.
 * - 404 si no se encontraron los pedidos.
 * - 500 si ocurre un error en el servidor.
 * @throws {Error} Si ocurre un error durante la eliminación.
 */
exports.eliminarPedido = async (req, res) => {
  try {
    const idsPedidos = req.body.idsPedido;

    // Validar que se envíen IDs válidos
    if (!Array.isArray(idsPedidos) || idsPedidos.length === 0) {
      return res.status(MENSAJES_PEDIDOS.PEDIDO_NO_ENCONTRADO.codigo).json({
        mensaje: MENSAJES_PEDIDOS.PEDIDO_NO_ENCONTRADO.mensaje,
      });
    }

    // Usar transacciones para eliminar los pedidos
    await Promise.all(
      idsPedidos.map(async (idPedido) => {
        const resultadoPedido = await repositorio.eliminarPedido(idPedido);

        if (resultadoPedido.resultadoPedido.affectedRows === 0) {
          throw new Error(`Pedido con ID ${idPedido} no encontrado`);
        }
      })
    );

    // Respuesta exitosa
    return res.status(MENSAJES_PEDIDOS.PEDIDO_ELIMINADO.codigo).json({
      mensaje: MENSAJES_PEDIDOS.PEDIDO_ELIMINADO.mensaje,
    });
  } catch (error) {
    console.error('Error al eliminar pedidos:', error);

    // Respuesta de error
    return res.status(MENSAJES_PEDIDOS.ERROR_ELIMINAR_PEDIDO.codigo).json({
      mensaje: MENSAJES_PEDIDOS.ERROR_ELIMINAR_PEDIDO.mensaje,
    });
  }
};
