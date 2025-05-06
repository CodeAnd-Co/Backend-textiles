const MENSAJES = require('@altertex/util/const/mensajesRoles');
const repositorio = require('@altertex/rol/repos/repositoriorEliminar');

/**
 * Controlador para eliminar un rol existente.
 *
 * @async
 * @function eliminarRol
 * @param {Express.Request} req - Objeto de solicitud de Express, debe contener `idRol` en `req.body`.
 * @param {Express.Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - No retorna un valor, responde al cliente con un JSON indicando éxito o error.
 *
 * @description
 * Esta función intenta eliminar un rol utilizando el repositorio correspondiente.
 * Si la eliminación es exitosa, responde con un código 200 y un mensaje de éxito.
 * Si ocurre un error, responde con un código 400 y un mensaje de error.
 */
exports.eliminarRol = async (req, res) => {
  const idRol = req.body.idsRol;
  try {
    console.log(idRol);
    await repositorio.eliminarRol(idRol);
    return res
      .status(MENSAJES.ELIMINAR_ROL_EXITO.codigo)
      .json({ mensaje: MENSAJES.ELIMINAR_ROL_EXITO.mensaje });
  } catch {
    return res
      .status(MENSAJES.ELIMINAR_ROL_ERROR.codigo)
      .json({ mensaje: MENSAJES.ELIMINAR_ROL_ERROR.mensaje });
  }
};
