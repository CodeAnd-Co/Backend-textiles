const MENSAJES = require('@altertex/util/const/mensajesPedidos');
const repositorio = require('@altertex/pedidos/repos/repositorioActualizarPedido');

/**
 * RF[62] - Actualizar Pedido
 * Controlador para actualizar la información de uno o varios pedidos.
 */
exports.actualizarPedido = async (req, res) => {
  let datos;
  console.log('body', req.body);
  if (req.body.idPedido) {
    datos = [req.body];
  } else if (req.body.cambios) {
    datos = Array.isArray(req.body.cambios) ? req.body.cambios : [req.body.cambios];
  } else {
    return res.status(MENSAJES.ERROR_ACTUALIZAR_PEDIDO.codigo).json({
      mensaje: MENSAJES.ERROR_ACTUALIZAR_PEDIDO.mensaje,
    });
  }

  if (!datos || datos.length === 0) {
    return res.status(MENSAJES.ERROR_ACTUALIZAR_PEDIDO.codigo).json({
      mensaje: MENSAJES.ERROR_ACTUALIZAR_PEDIDO.mensaje,
    });
  }

  try {
    await repositorio.actualizarPedido(datos);
    return res.status(MENSAJES.PEDIDO_ACTUALIZADO.codigo).json({
      mensaje: MENSAJES.PEDIDO_ACTUALIZADO.mensaje,
      datos,
    });
  } catch {
    return res.status(MENSAJES.ERROR_ACTUALIZAR_PEDIDO.codigo).json({
      mensaje: MENSAJES.ERROR_ACTUALIZAR_PEDIDO.mensaje,
    });
  }
};
