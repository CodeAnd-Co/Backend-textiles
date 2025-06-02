const repositorio = require('@altertex/cat/repos/repositorioLeerDetalleCategoria');
const MENSAJES_CATEGORIAS = require('@altertex/util/const/mensajesCategorias');

/**
 * Consulta el detalle de una categoría de productos, incluyendo sus productos asociados.
 *
 * @function
 * @async
 * @param {Express.Request} req - Objeto de solicitud HTTP con `req.params.idCategoria`.
 * @param {Express.Response} res - Objeto de respuesta HTTP para enviar el resultado.
 *
 * @returns {Promise<void>} Devuelve una respuesta HTTP con el detalle de la categoría o un mensaje de error.
 *
 * @description
 * Implementa el RF48: Leer categoría de productos.
 * Si no se encuentra la categoría, devuelve código 404.
 * Si ocurre un error inesperado, devuelve código 500.
 *
 * @see [RF48 - Documentación de requisitos](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF48)
 */
exports.consultarDetalleCategoria = async (req, res) => {
  const idCategoria = parseInt(req.params.idCategoria);

  try {
    const resultado = await repositorio.leerDetalleCategoria(idCategoria);

    if (!resultado) {
      return res
        .status(MENSAJES_CATEGORIAS.CATEGORIA_NO_ENCONTRADA.codigo)
        .json({ mensaje: MENSAJES_CATEGORIAS.CATEGORIA_NO_ENCONTRADA.mensaje });
    }

    return res
      .status(MENSAJES_CATEGORIAS.CATEGORIA_OBTENIDA.codigo)
      .json({ mensaje: MENSAJES_CATEGORIAS.CATEGORIA_OBTENIDA.mensaje, categoria: resultado });
  } catch {
    return res
      .status(MENSAJES_CATEGORIAS.ERROR_OBTENER_CATEGORIA.codigo)
      .json({ mensaje: MENSAJES_CATEGORIAS.ERROR_OBTENER_CATEGORIA.mensaje });
  }
};