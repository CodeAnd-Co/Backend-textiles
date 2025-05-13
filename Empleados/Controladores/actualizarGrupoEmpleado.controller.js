const MENSAJES = require('@altertex/util/const/mensajesGrupoEmpleados');
const repositorio = require('@altertex/emp/repos/repositorioActualizarGrupo');

// RF[24] Actualiza grupo empleado - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF24]

/**
 * Controlador HTTP para actualizar un grupo de empleados.
 *
 * Valida que el cuerpo de la solicitud contenga los datos necesarios,
 * y delega la lógica de actualización al repositorio correspondiente.
 *
 * Respuestas posibles:
 * - 400 si faltan datos en el cuerpo de la solicitud.
 * - 200 si el grupo se actualiza correctamente.
 * - 500 si ocurre un error en el proceso de actualización.
 *
 * @async
 * @function actualizarGrupoEmpleados
 * @param {Express.Request} req - Objeto de solicitud HTTP de Express.
 * @param {Express.Response} res - Objeto de respuesta HTTP de Express.
 * @returns {Promise<void>} La respuesta HTTP con el estado y mensaje correspondiente.
 */
exports.actualizarGrupoEmpleados = async (req, res) => {
  const datosActualizacion = req.body;
  if (!datosActualizacion || Object.keys(datosActualizacion).length === 0) {
    return res
      .status(MENSAJES.FORMATO_INVALIDO_DATOS.codigo)
      .json({ mensaje: MENSAJES.FORMATO_INVALIDO_DATOS.mensaje });
  }
  try {
    await repositorio.actualizarGrupoEmpleados(datosActualizacion);

    return res
      .status(MENSAJES.GRUPO_ACTUALIZADO.codigo)
      .json({ mensaje: MENSAJES.GRUPO_ACTUALIZADO.mensaje });
  } catch (error) {
    return res.status(MENSAJES.ERROR_ACTUALIZAR_GRUPOS.codigo).json({ mensaje: error.message });
  }
};
