const repositorio = require("@altertex/cat/repos/repositorioConsultarListaCategorias");
const MENSAJES_CATEGORIAS = require("@altertex/util/const/mensajesCategorias");

exports.consultarListaCategorias = async (req, res) => {
  const limit = parseInt(req.body.limit);
  const offset = parseInt(req.body.offset);

  if (isNaN(limit) || isNaN(offset)) {
    return res
      .status(MENSAJES_CATEGORIAS.PARAMETROS_INVALIDOS.codigo)
      .json({ mensaje: MENSAJES_CATEGORIAS.PARAMETROS_INVALIDOS.mensaje });
  }

  if (limit <= 0 || offset < 0) {
    return res
      .status(MENSAJES_CATEGORIAS.LIMITE_OFFSET_INVALIDOS.codigo)
      .json({ mensaje: MENSAJES_CATEGORIAS.LIMITE_OFFSET_INVALIDOS.mensaje });
  }

  try {
    const resultados = await repositorio.consultarListaCategorias(limit, offset);

    if (!resultados || resultados.length === 0) {
      return res
        .status(MENSAJES_CATEGORIAS.CATEGORIAS_NO_ENCONTRADAS.codigo)
        .json({ mensaje: MENSAJES_CATEGORIAS.CATEGORIAS_NO_ENCONTRADAS.mensaje });
    }

    return res.status(MENSAJES_CATEGORIAS.LISTA_CATEGORIAS_OBTENIDA.codigo).json({
      mensaje: MENSAJES_CATEGORIAS.LISTA_CATEGORIAS_OBTENIDA.mensaje,
      lista_categorias: resultados,
    });
  } catch (error) {
    console.error("Error al consultar categorías:", error);
    return res
      .status(MENSAJES_CATEGORIAS.ERROR_OBTENER_CATEGORIAS.codigo)
      .json({ mensaje: MENSAJES_CATEGORIAS.ERROR_OBTENER_CATEGORIAS.mensaje });
  }
};
