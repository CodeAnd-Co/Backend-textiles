const { actualizarCategoria } = require('@altertex/cat/repos/repositorioActualizarCategorias');
const MENSAJES = require('@altertex/util/const/mensajesCategorias');

/**
 * RF49 - Actualizar categoría de productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF49
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {Promise<void>}
 */
exports.actualizarCategoria = async (req, res) => {
  try {
    const { idCategoria } = req.params;
    const { nombreCategoria, descripcion, productos } = req.body;

    if (!idCategoria) {
      return res.status(400).json(MENSAJES.CATEGORIA_NO_ENCONTRADA);
    }

    if (!nombreCategoria || typeof nombreCategoria !== 'string' || nombreCategoria.trim() === '') {
      return res.status(400).json(MENSAJES.NOMBRE_CATEGORIA_INVALIDO);
    }

    if (!Array.isArray(productos)) {
      return res.status(400).json({
        codigo: 400,
        mensaje: 'El campo productos debe ser un arreglo.',
      });
    }

    if (descripcion && typeof descripcion !== 'string') {
  return res.status(400).json(MENSAJES.DESCRIPCION_INVALIDA);
  }

    await actualizarCategoria({ idCategoria, nombreCategoria, descripcion, productos });

    return res.status(200).json({
      codigo: 200,
      mensaje: 'Categoría actualizada correctamente.',
    });
  } catch {
    return res.status(500).json(MENSAJES.ERROR_CREAR_CATEGORIA);
  }
};