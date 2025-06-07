const repositorio = require('@altertex/cat/repos/repositorioEliminarCategoria');
const MENSAJES_CATEGORIAS = require('@altertex/util/const/mensajesCategorias');

/**
 * Controlador para eliminar una categoría de productos.
 * RF[50] - Elimina categoría de productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF50
 *
 * @async
 * @function eliminarCategoria
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} req.body - Cuerpo de la solicitud HTTP.
 * @param {number[]} req.body.idsCategoria - Array de IDs numéricos de las categorías a eliminar.
 * @param {object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Respuesta HTTP con estado:
 * - 200 si las categorías fueron eliminadas correctamente.
 * - 404 si no se encontraron las categorías.
 * - 500 si ocurre un error en el servidor.
 * @throws {Error} Si ocurre un error durante la eliminación.
 */
exports.eliminarCategoria = async (req, res) => {
  try {
    const idsCategorias = req.body.idsCategoria;

    if (!Array.isArray(idsCategorias) || idsCategorias.length === 0) {
      return res.status(MENSAJES_CATEGORIAS.CATEGORIA_NO_ENCONTRADA.codigo).json({
        mensaje: MENSAJES_CATEGORIAS.CATEGORIA_NO_ENCONTRADA.mensaje,
      });
    }

    await Promise.all(
      idsCategorias.map(async (idCategoria) => {
        await repositorio.eliminarProductoCategoria(idCategoria);
        const resultadoCategoria = await repositorio.eliminarCategoria(idCategoria);

        if (resultadoCategoria.affectedRows === 0) {
          throw new Error(`Categoría con ID ${idCategoria} no encontrada`);
        }
      })
    );

    return res.status(MENSAJES_CATEGORIAS.CATEGORIA_ELIMINADA.codigo).json({
      mensaje: MENSAJES_CATEGORIAS.CATEGORIA_ELIMINADA.mensaje,
    });
  } catch {
    return res.status(MENSAJES_CATEGORIAS.ERROR_ELIMINAR_CATEGORIA.codigo).json({
      mensaje: MENSAJES_CATEGORIAS.ERROR_ELIMINAR_CATEGORIA.mensaje,
    });
  }
};
