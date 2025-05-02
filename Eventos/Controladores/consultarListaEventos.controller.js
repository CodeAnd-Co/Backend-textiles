//RF37 Consulta Lista de Eventos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF37]

const repositorio = require('@altertex/eve/repos/repositorioConsultarListaEventos');
const MENSAJES_EVENTOS = require('@altertex/util/const/mensajesEventos');

/**
 *  Obtiene la lista de eventos asociados al cliente del usuario autenticado
 * @function consultarListaEventos
 * @param {object} req - Objeto de solicitud Express
 * @param {object} res - Objeto de respuesta Express
 * @returns {object} Respuesta JSON con la lista de eventos o mensaje de error
 */
exports.consultarListaEventos = async (req, res) => {
  try {
    const idCliente = parseInt(req.user.clienteSeleccionado);

    if (isNaN(idCliente)) {
      return res.status(MENSAJES_EVENTOS.PARAMETROS_INVALIDOS.codigo).json({
        mensaje: 'ID del cliente no válido o no seleccionado',
      });
    }

    const resultados = await repositorio.consultarListaEventos(idCliente);

    if (!resultados || resultados.length === 0) {
      return res.status(MENSAJES_EVENTOS.EVENTOS_NO_ENCONTRADOS.codigo).json({
        mensaje: MENSAJES_EVENTOS.EVENTOS_NO_ENCONTRADOS.mensaje,
      });
    }

    return res.status(MENSAJES_EVENTOS.LISTA_EVENTOS_OBTENIDA.codigo).json({
      mensaje: MENSAJES_EVENTOS.LISTA_EVENTOS_OBTENIDA.mensaje,
      listaEventos: resultados,
    });
  } catch (error) {
    console.error('Error al consultar eventos:', error);
    return res
      .status(MENSAJES_EVENTOS.ERROR_OBTENER_EVENTOS.codigo)
      .json({ mensaje: MENSAJES_EVENTOS.ERROR_OBTENER_EVENTOS.mensaje });
  }
};
