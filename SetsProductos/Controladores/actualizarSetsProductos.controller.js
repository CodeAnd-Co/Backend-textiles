const MENSAJES = require('@altertex/util/const/mensajesSetsProductos');
const repositorio = require('@altertex/setspro/repos/repositorioActualizarSetsProductos');
//RF[44] Actualizar set de productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF44]

/**
 * Controlador HTTP para actualizar un set de productos.
 *
 * Valida que el cuerpo de la solicitud contenga los datos necesarios,
 * y delega la lógica de actualización al repositorio correspondiente.
 *
 * Respuestas posibles:
 * - 400 si faltan datos en el cuerpo de la solicitud.
 * - 200 si el set se actualiza correctamente.
 * - 500 si ocurre un error en el proceso de actualización.
 *
 * @async
 * @function actualizarSetProductos
 * @param {Express.Request} req - Objeto de solicitud HTTP de Express.
 * @param {Express.Response} res - Objeto de respuesta HTTP de Express.
 * @returns {Promise<void>} La respuesta HTTP con el estado y mensaje correspondiente.
 */
exports.actualizarSetProductos = async (req, res) => {
  const datosActualizacion = req.body;

  // Validación básica de datos requeridos
  if (
    !datosActualizacion
    || !datosActualizacion.nombre
    || !datosActualizacion.productos
    || !Array.isArray(datosActualizacion.productos)
  ) {
    return res.status(MENSAJES.FORMATO_INVALIDO_DATOS.codigo).json({
      mensaje: MENSAJES.FORMATO_INVALIDO_DATOS.mensaje,
      detalles: 'Se requieren nombre y lista de productos',
    });
  }

  try {
    await repositorio.actualizarSetProductos(datosActualizacion);

    return res.status(MENSAJES.SET_ACTUALIZADO.codigo).json({
      mensaje: MENSAJES.SET_ACTUALIZADO.mensaje,
      datos: datosActualizacion,
    });
  } catch (error) {
    console.error('Error al actualizar set de productos:', error);

    return res.status(MENSAJES.ERROR_ACTUALIZAR_SET.codigo).json({
      mensaje: MENSAJES.ERROR_ACTUALIZAR_SET.mensaje,
      error: error.message,
    });
  }
};
