// RF[46] Consulta Lista de Productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF46]

const MENSAJES = require('@altertex/util/const/mensajesCategorias');
const repositorio = require('@altertex/cat/repos/repositorioCrearCategoria');

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
  const categoria = req.body.categoria;

  if (!categoria.nombreCategoria || !categoria.productos) {
    return res
      .status(MENSAJES.NOMBRE_CATEGORIA_INVALIDO.codigo)
      .json({ error: MENSAJES.NOMBRE_CATEGORIA_INVALIDO.mensaje });
  }

  try {
    await repositorio.crearCategoria(categoria);

    return res
      .status(MENSAJES.CATEGORIA_CREADA.codigo)
      .json({ exito: MENSAJES.CATEGORIA_CREADA.mensaje });
  } catch (errorRepo) {
    return res
      .status(MENSAJES.ERROR_CREAR_CATEGORIA.codigo)
      .json({ error: MENSAJES.ERROR_CREAR_CATEGORIA.mensaje, errorRepo });
  }
};
