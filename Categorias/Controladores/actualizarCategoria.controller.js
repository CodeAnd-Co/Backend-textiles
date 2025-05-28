const { actualizarCategoria } = require('@altertex/cat/repos/repositorioActualizarCategorias');
const MENSAJES = require('@altertex/util/const/mensajesCategorias');

/**
 * RF49 - Actualizar categoría de productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF49
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.actualizarCategoria = async (req, res) => {
  try {
    const { idCategoria } = req.params;
    const { nombreCategoria, descripcion, productos } = req.body;

    if (!idCategoria || !nombreCategoria || typeof nombreCategoria !== 'string') {
      return res.status(400).json(MENSAJES.PARAMETROS_INVALIDOS);
    }

    await actualizarCategoria({ idCategoria, nombreCategoria, descripcion, productos });

    return res.status(200).json({
      codigo: 200,
      mensaje: 'Categoría actualizada correctamente.',
    });
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    return res.status(500).json({
      codigo: 500,
      mensaje: 'Ocurrió un error al actualizar la categoría.',
    });
  }
};