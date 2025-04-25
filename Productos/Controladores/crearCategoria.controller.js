// RF[46] Consulta Lista de Productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF46]

const MENSAJES = require('@altertex/util/const/mensajesCategorias');
const repositorio = require('@altertex/pro/repos/repositorioCrearCategoria');

/**
 * Crea una nueva categoría y la guarda en la base de datos.
 *
 * @function
 * @async
 * @param {Express.Request} req - Objeto de solicitud HTTP, debe contener `nombreCategoria` y `productos` en `req.body`.
 * @param {Express.Response} res - Objeto de respuesta HTTP para enviar el resultado de la operación.
 *
 * @returns {Promise<void>} Envía una respuesta HTTP con el resultado de la operación.
 *
 * @description
 * Este endpoint implementa el RF[46] para la creación de una categoría con productos asociados.
 * Valida que los datos requeridos estén presentes y maneja errores de forma controlada.
 */
exports.crearCategoria = async (req, res) => {
  const categoria = req.body;

  if (!categoria.nombreCategoria || !categoria.productos) {
    return res
      .status(MENSAJES.ERROR_NO_CATEGORIA.codigo)
      .json({ error: MENSAJES.ERROR_NO_CATEGORIA.mensaje });
  }

  try {
    await repositorio.crearCategoria(categoria);

    return res
      .status(MENSAJES.CREACION_EXITOSA.codigo)
      .json({ exito: MENSAJES.CREACION_EXITOSA.mensaje, categoria });
  } catch (errorRepo) {
    return res
      .status(MENSAJES.ERROR_CREACION.codigo)
      .json({ error: MENSAJES.ERROR_CREACION.mensaje, errorRepo });
  }
};
