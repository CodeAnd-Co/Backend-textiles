const MENSAJES = require('@altertex/util/const/mensajesClientes');
const repositorio = require('@altertex/cli/repos/repositorioActualizarCliente');
// RF14 - Actualiza Cliente - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF14

/**
 * Controlador para actualizar los datos de un cliente.
 *
 * Extrae los datos de actualización y la imagen (si existe) desde la petición.
 * Valida que el ID del cliente esté presente y delega la actualización al repositorio.
 * Devuelve una respuesta JSON con el estado correspondiente según el resultado.
 *
 * @param {Express.Request} req - Objeto de solicitud HTTP de Express.
 * @param {object} req.body - Cuerpo de la solicitud con los datos del cliente.
 * @param {string} req.body.idCliente - ID único del cliente a actualizar.
 * @param {string} [req.body.nombreLegal] - Nuevo nombre legal del cliente (opcional).
 * @param {string} [req.body.nombreComercial] - Nuevo nombre comercial del cliente (opcional).
 * @param {object} [req.file] - Archivo de imagen cargado, si se proporciona.
 * @param {Buffer} req.file.buffer - Contenido de la imagen en buffer.
 * @param {string} req.file.mimetype - Tipo MIME del archivo de imagen.
 *
 * @param {Express.Response} res - Objeto de respuesta HTTP de Express.
 *
 * @returns {Promise<void>} No retorna un valor directamente; envía la respuesta HTTP.
 */
exports.actualizarClientes = async (req, res) => {
  const datosActualizacion = req.body;
  const imagenActualizacion = req.file;

  // Validación básica de la solicitud
  if (!datosActualizacion.idCliente) {
    return res
      .status(MENSAJES.FORMATO_ID_CLIENTE_INVALIDO.codigo)
      .json({ mensaje: MENSAJES.FORMATO_ID_CLIENTE_INVALIDO.mensaje });
  }

  // Validación de que al menos un dato para actualizar esté presente
  if (
    !datosActualizacion.nombreLegal
    && !datosActualizacion.nombreComercial
    && !imagenActualizacion
  ) {
    return res.status(MENSAJES.PARAMETROS_INVALIDOS.codigo).json({
      mensaje:
        'Se debe proporcionar al menos un dato para actualizar (nombre legal, nombre comercial o imagen)',
    });
  }

  try {
    const mensaje = await repositorio.actualizarCliente(datosActualizacion, imagenActualizacion);

    return res.status(MENSAJES.CLIENTE_ACTUALIZADO.codigo).json({ mensaje });
  } catch (error) {
    // Determinar el código de error adecuado basado en el mensaje de error
    let codigoError = MENSAJES.ERROR_CLIENTE_ACTUALIZADO.codigo;
    const mensajeError = error.message || MENSAJES.ERROR_CLIENTE_ACTUALIZADO.mensaje;

    // Asignar códigos de error específicos según el tipo de error
    if (error.message === MENSAJES.CLIENTE_NO_ENCONTRADO.mensaje) {
      codigoError = MENSAJES.CLIENTE_NO_ENCONTRADO.codigo;
    } else if (error.message === MENSAJES.CLIENTE_COMERCIAL_EXISTENTE.mensaje) {
      codigoError = MENSAJES.CLIENTE_COMERCIAL_EXISTENTE.codigo;
    } else if (error.message === MENSAJES.CLIENTE_FISCAL_EXISTENTE.mensaje) {
      codigoError = MENSAJES.CLIENTE_FISCAL_EXISTENTE.codigo;
    } else if (error.message.includes('No se encontró la imagen')) {
      codigoError = 404;
    } else if (error.message.includes('Error al actualizar la imagen')) {
      codigoError = 500;
    } else if (error.message.includes('Error al actualizar los datos')) {
      codigoError = 500;
    } else if (error.message.includes('No se pudo actualizar')) {
      codigoError = 400;
    }

    console.error(`[ERROR] ActualizarClientes: ${error.message}`);

    return res.status(codigoError).json({ mensaje: mensajeError });
  }
};
