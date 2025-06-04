const MENSAJES = require('@altertex/util/const/mensajesRoles');
const repositorio = require('@altertex/rol/repos/repositorioActualizarRol');

/**
 * Controlador para actualizar un rol.
 *
 * Este controlador recibe los datos del rol a actualizar desde el cuerpo de la solicitud
 * y el cliente seleccionado desde el usuario autenticado. Valida los datos y delega
 * la lógica de actualización al repositorio.
 *
 * @function
 * @param {Express.Request} req - Objeto de solicitud de Express.
 * @param {Express.Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Retorna una respuesta HTTP con el resultado de la operación.
 */
exports.actualizarRol = async (req, res) => {
  const idCliente = req.user.clienteSeleccionado;
  const datosActualizacion = req.body.datosRolActualizacion;

  if (!idCliente) {
    return res.status(400).json({ mensaje: 'No se ha seleccionado un cliente.' });
  }

  if (!datosActualizacion) {
    return res.status(MENSAJES.PARAMETROS_INVALIDOS.codigo).json({ mensaje: MENSAJES.PARAMETROS_INVALIDOS.mensaje });
  }

  try {
    await repositorio.actualizarRol(idCliente, datosActualizacion);
    return res.status(MENSAJES.ACTUALIZAR_ROL.codigo).json({ mensaje: MENSAJES.ACTUALIZAR_ROL.mensaje });
  } catch (error) {
    return res.status(400).json({ mensaje: error.message });
  }
};