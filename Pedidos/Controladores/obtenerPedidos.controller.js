const MENSAJES = require('@altertex/util/const/mensajesPedidos');
const repositorio = require('@altertex/pedidos/repos/repositorioObtenerPedidos');

/**
 * RF60 - Consulta Lista de Pedidos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF60
 * Controlador para obtener la lista de pedidos de un cliente autenticado.
 *
 * @async
 * @function obtenerLista
 * @param {Express.Request} req - Objeto de solicitud de Express. Debe contener `user.clienteSeleccionado`.
 * @param {Express.Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Respuesta HTTP con la lista de pedidos o un mensaje de error.
 *
 * @example
 * // Éxito
 * res.status(200).json({
 *   mensaje: 'Consulta exitosa',
 *   pedidos: [...]
 * });
 *
 * @example
 * // Error: cliente no seleccionado
 * res.status(400).json({
 *   error: 'No se pudo consultar los pedidos.'
 * });
 */
exports.obtenerLista = async (req, res) => {
  const idCliente = req.user?.clienteSeleccionado;

  if (!idCliente) {
    return res
      .status(MENSAJES.ERROR_CONSULTAR_PEDIDOS.codigo)
      .json({ error: MENSAJES.ERROR_CONSULTAR_PEDIDOS.mensaje });
  }

  try {
    const resultado = await repositorio.obteneLista(idCliente);
    return res
      .status(MENSAJES.CONSULTA_EXITOSA.codigo)
      .json({ mensaje: MENSAJES.CONSULTA_EXITOSA.mensaje, pedidos: resultado });
  } catch (error) {
    console.log(error);
    return res
      .status(MENSAJES.ERROR_CONSULTAR_PEDIDOS.codigo)
      .json({ error: MENSAJES.ERROR_CONSULTAR_PEDIDOS.mensaje });
  }
};
