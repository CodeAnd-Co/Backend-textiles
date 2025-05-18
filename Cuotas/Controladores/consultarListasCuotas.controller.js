const repositorio = require('@altertex/cuota/repos/cuotasRepositorio');
const MENSAJES_CUOTAS = require('@altertex/util/const/mensajesCuotas');

/**
 * Controlador para consultar la lista de sets de cuotas.
 *
 * RF32 - Consulta Lista de Sets de Cuotas - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF32
 *
 * @async
 * @function consultarLista
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} req.user - Datos del usuario autenticado.
 * @param {number} req.user.clienteSeleccionado - ID del cliente autenticado.
 * @param {object} res - Objeto de respuesta de Express.
 *
 * @returns {Response} Respuesta HTTP con:
 * - 200 si la consulta fue exitosa.
 * - 204 si no hay resultados.
 * - 400 si falta el ID del cliente.
 * - 500 si hay error en el servidor.
 */
exports.consultarLista = async (req, res) => {
  const idCliente = parseInt(req.user.clienteSeleccionado);

  if (!idCliente) {
    return res
      .status(MENSAJES_CUOTAS.PARAMETROS_INVALIDOS.codigo)
      .json({ mensaje: MENSAJES_CUOTAS.PARAMETROS_INVALIDOS.mensaje });
  }

  try {
    const resultados = await repositorio.obtenerCuotas(idCliente);

    if (!resultados || resultados.length === 0) {
      return res
        .status(MENSAJES_CUOTAS.SIN_RESULTADOS.codigo)
        .json({ mensaje: MENSAJES_CUOTAS.SIN_RESULTADOS.mensaje });
    }

    return res.status(MENSAJES_CUOTAS.CONSULTA_EXITOSA.codigo).json({
      mensaje: MENSAJES_CUOTAS.CONSULTA_EXITOSA.mensaje,
      cuotas: resultados,
    });
  } catch {
    return res
      .status(MENSAJES_CUOTAS.ERROR_CONSULTAR_CUOTAS.codigo)
      .json({ mensaje: MENSAJES_CUOTAS.ERROR_CONSULTAR_CUOTAS.mensaje });
  }
};
