const repositorio = require('@altertex/eve/repos/repositorioConsultarEvento');
const MENSAJES_EVENTOS = require('@altertex/util/const/mensajesEventos');

/**
 * Lee los detalles de un evento desde la base de datos utilizando su ID.
 *
 * Valida el parámetro `idEvento` y obtiene la información del evento a través del repositorio.
 * Si el evento no es encontrado o el parámetro es inválido, retorna un error.
 *
 * @param {Express.Request} req - La solicitud HTTP que contiene el `idEvento` en el cuerpo.
 * @param {Express.Response} res - La respuesta HTTP para enviar el resultado al cliente.
 * @returns {Promise<void>} Responde con el evento encontrado o un mensaje de error.
 *
 * @see [RF38 Leer evento](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF38)
 */
exports.consultarEvento = async (req, res) => {
  const idEvento = parseInt(req.body.idEvento);

  if (isNaN(idEvento)) {
    return res
      .status(MENSAJES_EVENTOS.PARAMETROS_INVALIDOS.codigo)
      .json({ mensaje: MENSAJES_EVENTOS.PARAMETROS_INVALIDOS.mensaje });
  }

  try {
    const evento = await repositorio.obtenerEventoPorId(idEvento);

    if (!evento) {
      return res
        .status(MENSAJES_EVENTOS.EVENTO_NO_ENCONTRADO.codigo)
        .json({ mensaje: MENSAJES_EVENTOS.EVENTO_NO_ENCONTRADO.mensaje });
    }

    return res.status(MENSAJES_EVENTOS.EVENTO_OBTENIDO.codigo).json({
      mensaje: MENSAJES_EVENTOS.EVENTO_OBTENIDO.mensaje,
      evento,
    });
  } catch (error) {
    console.error('Error al consultar evento:', error);
    return res
      .status(MENSAJES_EVENTOS.ERROR_OBTENER_EVENTO.codigo)
      .json({ mensaje: MENSAJES_EVENTOS.ERROR_OBTENER_EVENTO.mensaje });
  }
};
