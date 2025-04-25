//RF[50] Elimina categoría de productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF50]
const repositorio = require("@altertex/cat/repos/repositorioEliminarCategoria");
const MENSAJES_CATEGORIAS = require("@altertex/util/const/mensajesCategorias");

exports.eliminarCategoria = async (req, res) => {
  try {
    const idCategoria = parseInt(req.body.idCategoria);

    if (!idCategoria) {
      return res
        .status(MENSAJES_CATEGORIAS.CATEGORIA_NO_ENCONTRADA.codigo)
        .json({
          mensaje: MENSAJES_CATEGORIAS.CATEGORIA_NO_ENCONTRADA.mensaje,
        });
    }

    const resultado = await repositorio.eliminarCategoria(idCategoria);

    if (resultado.affectedRows === 0) {
      return res
        .status(MENSAJES_CATEGORIAS.CATEGORIA_NO_ENCONTRADA.codigo)
        .json({
          mensaje: MENSAJES_CATEGORIAS.CATEGORIA_NO_ENCONTRADA.mensaje,
        });
    }

    return res.status(MENSAJES_CATEGORIAS.CATEGORIA_ELIMINADA.codigo).json({
      mensaje: MENSAJES_CATEGORIAS.CATEGORIA_ELIMINADA.mensaje,
    });
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    return res
      .status(MENSAJES_CATEGORIAS.ERROR_ELIMINAR_CATEGORIA.codigo)
      .json({
        mensaje: MENSAJES_CATEGORIAS.ERROR_ELIMINAR_CATEGORIA.mensaje,
      });
  }
};
