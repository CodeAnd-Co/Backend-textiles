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
  console.log('datosActualizacion: ', imagenActualizacion);

  if (!datosActualizacion.idCliente) {
    return res
      .status(MENSAJES.FORMATO_ID_CLIENTE_INVALIDO.codigo)
      .json({ mensaje: MENSAJES.FORMATO_ID_CLIENTE_INVALIDO.mensaje });
  }

  try {
    await repositorio.actualizarCliente(datosActualizacion, imagenActualizacion);

    return res
      .status(MENSAJES.CLIENTE_ACTUALIZADO.codigo)
      .json({ mensaje: MENSAJES.CLIENTE_ACTUALIZADO.mensaje });
  } catch {
    return res
      .status(MENSAJES.ERROR_CLIENTE_ACTUALIZADO.codigo)
      .json({ mensaje: MENSAJES.ERROR_CLIENTE_ACTUALIZADO.mensaje });
  }
};
