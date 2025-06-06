const MENSAJES = require('@altertex/util/const/mensajesUsuarios');
const repositorio = require('@altertex/usu/repos/repositorioActualizarUsuario');
const bcrypt = require('bcryptjs');

//RF[4] Actualizar Usuario - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF4]

/**
 * Controlador para actualizar la información de un usuario.
 *
 * Este endpoint recibe un objeto con los cambios que se aplicarán
 * sobre un usuario y usa su repositorio para hacer el cambio en la
 * base de datos.
 *
 * @function actualizarUsuario
 * @async
 * @param {Express.Request} req - Objeto de solicitud HTTP de Express.
 * @param {object} req.body - Cuerpo de la solicitud.
 * @param {object|Array<object>} req.body.cambios - Información del usuario a actualizar.
 * @param {Express.Response} res - Objecto de respuesta HTTP de Express.
 * @returns {Promise<void>} Retorna una respuesta JSON indicando éxito o un error.
 */
exports.actualizarUsuario = async (req, res) => {
  let datos;

  // Si no hay cambios
  if (req.body.id || req.body.idUsuario) {
    datos = [req.body];
  } else if (req.body.cambios) {
    // Si la información viene en el formato esperado (hay cambios)
    datos = Array.isArray(req.body.cambios) ? req.body.cambios : [req.body.cambios];
    const contraseniaEncriptada = await bcrypt.hash(datos[0]['contrasenia'], 10);
    datos[0]['contrasenia'] = contraseniaEncriptada;
  } else {
    return res
      .status(MENSAJES.ERROR_ACTUALIZAR_USUARIO.codigo)
      .json({ mensaje: MENSAJES.ERROR_ACTUALIZAR_USUARIO.mensaje });
  }

  if (!datos || datos.length === 0) {
    return res
      .status(MENSAJES.ERROR_ACTUALIZAR_USUARIO.codigo)
      .json({ mensaje: MENSAJES.ERROR_ACTUALIZAR_USUARIO.mensaje });
  }
  try {
    await repositorio.actualizarUsuario(datos);
    return res
      .status(MENSAJES.USUARIO_ACTUALIZADO.codigo)
      .json({ mensaje: MENSAJES.USUARIO_ACTUALIZADO.mensaje, datos });
  } catch (e) {
    return res
      .status(MENSAJES.ERROR_ACTUALIZAR_USUARIO.codigo)
      .json({ mensaje: MENSAJES.ERROR_ACTUALIZAR_USUARIO.mensaje });
  }
};
