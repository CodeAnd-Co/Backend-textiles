const repositorio = require('@altertex/cat/repos/repositorioConsultarListaCategorias');
const MENSAJES_CATEGORIAS = require('@altertex/util/const/mensajesCategorias');

/**
 * Consulta la lista de categorías asociadas a un cliente.
 *
 * @function
 * @async
 * @param {Express.Request} req - Objeto de solicitud HTTP. Debe contener `req.user.clienteSeleccionado` como ID del cliente autenticado.
 * @param {Express.Response} res - Objeto de respuesta HTTP para enviar los resultados.
 *
 * @returns {Promise<void>} Devuelve una respuesta HTTP con la lista de categorías o un mensaje de error.
 *
 * @see [RF47 - Documentación de requisitos](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF47)
 */
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
  } catch {
    return res
      .status(MENSAJES_CATEGORIAS.ERROR_OBTENER_CATEGORIAS.codigo)
      .json({ mensaje: MENSAJES_CATEGORIAS.ERROR_OBTENER_CATEGORIAS.mensaje });
  }
};