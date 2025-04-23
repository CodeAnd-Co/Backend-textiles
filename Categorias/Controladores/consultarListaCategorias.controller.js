const repositorio = require("@altertex/cat/repos/repositorioConsultarListaCategorias");
const MENSAJES_CATEGORIAS = require("@altertex/util/const/mensajesCategorias");

exports.consultarListaCategorias = async (req, res) => {
  try {
    const resultados = await repositorio.consultarListaCategorias();

    if (!resultados || resultados.length === 0) {
      return res
        .status(MENSAJES_CATEGORIAS.CATEGORIAS_NO_ENCONTRADAS.codigo)
        .json({ mensaje: MENSAJES_CATEGORIAS.CATEGORIAS_NO_ENCONTRADAS.mensaje });
    }

    return res.status(MENSAJES_CATEGORIAS.LISTA_CATEGORIAS_OBTENIDA.codigo).json({
      mensaje: MENSAJES_CATEGORIAS.LISTA_CATEGORIAS_OBTENIDA.mensaje,
      listaCategoria: resultados,
    });
  } catch (error) {
    console.error("Error al consultar categorías:", error);
    return res
      .status(MENSAJES_CATEGORIAS.ERROR_OBTENER_CATEGORIAS.codigo)
      .json({ mensaje: MENSAJES_CATEGORIAS.ERROR_OBTENER_CATEGORIAS.mensaje });
  }
};