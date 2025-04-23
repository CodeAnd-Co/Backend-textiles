const repositorio = require("@altertex/cat/repos/repositorioConsultarListaEventos");
const MENSAJES_EVENTOS = require("@altertex/util/const/mensajesEventos");

exports.consultarListaEventos = async (req, res) => {
  try {
    const resultados = await repositorio.consultarListaEventos();

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
