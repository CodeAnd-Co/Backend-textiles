const MENSAJES = require('@altertex/util/const/mensajesPagos');

exports.consultarTipoPago = async (req, res) => {
  const cliente = req.user.clienteSeleccionado;
  if (!cliente) {
    return res
      .status(MENSAJES.ERROR_CLIENTE_SELECCIONADO.codigo)
      .json({ mensaje: MENSAJES.ERROR_CLIENTE_SELECCIONADO.mensaje });
  }
  try {
    return res
      .status(MENSAJES.CONSULTA_EXITOSA.codigo)
      .json({ mensaje: MENSAJES.CONSULTA_EXITOSA.mensaje });
  } catch {
    return res
      .status(MENSAJES.ERROR_CONSULTA.codigo)
      .json({ mensaje: MENSAJES.ERROR_CONSULTA.mensaje });
  }
};
