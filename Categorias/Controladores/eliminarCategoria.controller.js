const repositorio = require("@altertex/cat/repos/repositorioEliminarCategoria");
const MENSAJES_CATEGORIAS = require("@altertex/util/const/mensajesCategorias");

/**
 * Controlador para eliminar una categoría de productos.
 * RF[50] - Elimina categoría de productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF50
 * @async
 * @function eliminarCategoria
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Cuerpo de la solicitud HTTP.
 * @param {number} req.body.idCategoria - ID numérico de la categoría a eliminar.
 * @param {Object} res - Objeto de respuesta de Express.
 *
 * @returns {Response} Respuesta HTTP con estado:
 * - 200 si la categoría fue eliminada correctamente.
 * - 404 si no se encontró la categoría.
 * - 500 si ocurre un error en el servidor.
 *
 * @throws {Error}
 */
 

exports.eliminarCategoria = async (req, res) => {
  try {
    const idsCategorias = req.body.idsCategoria;

    if (!Array.isArray(idsCategorias) || idsCategorias.length === 0) {
      return res
        .status(MENSAJES_CATEGORIAS.CATEGORIA_NO_ENCONTRADA.codigo)
        .json({
          mensaje: MENSAJES_CATEGORIAS.CATEGORIA_NO_ENCONTRADA.mensaje,
        });
    }

    await Promise.all(
      idsCategorias.map(async (idCategoria) => {
        await repositorio.eliminarProductoCategoria(idCategoria);
        const resultadoCategoria = await repositorio.eliminarCategoria(
          idCategoria
        );

        if (resultadoCategoria.affectedRows === 0) {
          throw new Error(`Categoría con ID ${idCategoria} no encontrada`);
        }
      })
    );

    return res.status(MENSAJES_CATEGORIAS.CATEGORIA_ELIMINADA.codigo).json({
      mensaje: MENSAJES_CATEGORIAS.CATEGORIA_ELIMINADA.mensaje,
    });
  } catch (error) {
    console.error("Error al eliminar categorías:", error);
    return res
      .status(MENSAJES_CATEGORIAS.ERROR_ELIMINAR_CATEGORIA.codigo)
      .json({
        mensaje: MENSAJES_CATEGORIAS.ERROR_ELIMINAR_CATEGORIA.mensaje,
      });
  }
};
