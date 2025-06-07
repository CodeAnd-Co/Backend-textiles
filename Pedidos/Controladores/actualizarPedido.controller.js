const MENSAJES = require('@altertex/util/const/mensajesPedidos');
const repositorio = require('@altertex/pedidos/repos/repositorioActualizarPedido');

/**
 * RF[62] - Actualizar Pedido [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF62]
 * Controlador para actualizar la información de uno o varios pedidos.
 *
 * Respuestas posibles:
 * - 400 si faltan datos en el cuerpo de la solicitud.
 * - 200 si el pedido se actualiza correctamente.
 *
 * @async
 * @function actualizarGrupoEmpleados
 * @param {Express.Request} req - Objeto de solicitud HTTP de Express.
 * @param {Express.Response} res - Objeto de respuesta HTTP de Express.
 * @returns {Promise<void>} La respuesta HTTP con el estado y mensaje correspondiente.
 */
exports.actualizarPedido = async (req, res) => {
  let datos;
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
