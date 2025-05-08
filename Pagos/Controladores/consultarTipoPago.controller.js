const MENSAJES = require('@altertex/util/const/mensajesPagos');
const repositorio = require('@altertex/pago/repos/repositorioConsultarTipoPago');

/**
 * Controlador para consultar los tipos de pago disponibles para el cliente autenticado.
 *
 * Este endpoint obtiene el ID del cliente desde el usuario autenticado (`req.user.clienteSeleccionado`)
 * y devuelve la lista de métodos de pago habilitados para dicho cliente.
 *
 * @function consultarTipoPago
 * @async
 * @param {Express.Request} req - Objeto de solicitud HTTP. Se espera que contenga `user.clienteSeleccionado`.
 * @param {Express.Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} Retorna una respuesta JSON con la lista de métodos de pago o un mensaje de error.
 */
exports.consultarTipoPago = async (req, res) => {
  const cliente = req.user.clienteSeleccionado;
  if (!cliente) {
    return res
      .status(MENSAJES.ERROR_CLIENTE_SELECCIONADO.codigo)
      .json({ mensaje: MENSAJES.ERROR_CLIENTE_SELECCIONADO.mensaje });
  }
  try {
    const listaTipoPagos = await repositorio.consutlarTipoPago(cliente);

    return res
      .status(MENSAJES.CONSULTA_EXITOSA.codigo)
      .json({ mensaje: MENSAJES.CONSULTA_EXITOSA.mensaje, listaTipoPagos });
  } catch {
    return res
      .status(MENSAJES.ERROR_CONSULTA.codigo)
      .json({ mensaje: MENSAJES.ERROR_CONSULTA.mensaje });
  }
};
