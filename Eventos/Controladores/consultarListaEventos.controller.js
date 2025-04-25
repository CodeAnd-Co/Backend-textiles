//RF37 Consulta Lista de Eventos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF37]

const repositorio = require("@altertex/eve/repos/repositorioConsultarListaEventos");
const MENSAJES_EVENTOS = require("@altertex/util/const/mensajesEventos");

/**
 * @function consultarListaEventos
 * @description Obtiene la lista de eventos asociados al cliente del usuario autenticado
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 * @returns {Object} Respuesta JSON con la lista de eventos o mensaje de error
 */
exports.consultarListaEventos = async (req, res) => {
  try {
    const idCliente = parseInt(req.user.clienteSeleccionado);

    if (isNaN(idCliente)) {
      return res.status(MENSAJES_EVENTOS.PARAMETROS_INVALIDOS.codigo).json({
        mensaje: "ID del cliente no válido o no seleccionado",
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
      lista_eventos: resultados,
    });
  } catch (error) {
    console.error("Error al consultar eventos:", error);
    return res
      .status(MENSAJES_EVENTOS.ERROR_OBTENER_EVENTOS.codigo)
      .json({ mensaje: MENSAJES_EVENTOS.ERROR_OBTENER_EVENTOS.mensaje });
  }
};
