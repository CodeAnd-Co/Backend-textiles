const repositorio = require('@altertex/cuota/repos/obtenerOpcionesCuotasRepositorio');
const MENSAJES = require('@altertex/util/const/mensajesCuotas');

/**
 * Obtiene las opciones de cuota disponibles para un cliente.
 *
 * Este controlador se encarga de recibir la solicitud para obtener las opciones de cuota para un cliente,
 * verificando primero que el `idCliente` esté presente en la solicitud. Luego, llama a un repositorio para
 * obtener las opciones de cuota. Si ocurre un error o falta el `idCliente`, se responde con un mensaje de error.
 *
 * @param {object} req - El objeto de solicitud que contiene el `idCliente` en su cuerpo.
 * @param {object} res - El objeto de respuesta para enviar el resultado o el error.
 * @returns {Promise<void>} No devuelve valor explícito. Envía una respuesta con el estado adecuado.
 */
exports.obtenerOpcionesCuotas = async (req, res) => {
  try {
    const idCliente = req.body.clienteSeleccionado;
    if (!idCliente) {
      return res.status(400).json({ mensaje: MENSAJES.FALTA_ID_CLIENTE });
    }

    const resultado = await repositorio.obtenerCuotaOpcion(idCliente);

    return res.status(201).json({ mensaje: MENSAJES.OPCIONES_OBTENIDAS, resultado });
  } catch (error) {
    return res.status(400).json({ mensaje: MENSAJES.ERROR_OBTENIENDO_OPCIONES, error });
  }
};
