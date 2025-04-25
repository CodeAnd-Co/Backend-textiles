//RF[47] Consulta lista de categorías - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF47]

const repositorio = require("@altertex/cat/repos/repositorioConsultarListaCategorias");
const MENSAJES_CATEGORIAS = require("@altertex/util/const/mensajesCategorias");

exports.consultarListaCategorias = async (req, res) => {
  const idCliente = parseInt(req.user.clienteSeleccionado);

  try {
    const resultados = await repositorio.consultarListaCategorias(idCliente);

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