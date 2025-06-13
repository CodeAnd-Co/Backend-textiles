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
  const cambios = req.body.cambios || req.body;

  if (!cambios) {
    return res.status(400).json({ mensaje: 'No se enviaron los datos del usuario' });
  }

  const datos = Array.isArray(cambios) ? cambios : [cambios];

  if (!datos[0].idUsuario) {
    return res.status(400).json({ mensaje: 'ID del usuario no proporcionado' });
  }

  if (datos[0].contrasenia) {
     const contraseniaEncriptada = await bcrypt.hash(datos[0].contrasenia, 10);
    datos[0].contrasenia = contraseniaEncriptada;
  }

  try {
    await repositorio.actualizarUsuario(datos);
    return res.status(200).json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (error) {
    return res.status(400).json({ mensaje: error.message });
  }
};
