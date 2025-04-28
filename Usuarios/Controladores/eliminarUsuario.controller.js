// RF5 - Eliminar Usuario -  https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/rf5/

const repositorio = require('@altertex/usu/repos/repositorioEliminarUsuario');
const MENSAJES_USUARIOS = require('@altertex/util/const/mensajesUsuarios');

/**
 * Lee los detalles de un usuario desde la base de datos utilizando su ID.
 *
 * Valida el parámetro `idUsuario` y obtiene la información del usuario a través del repositorio.
 * Si el usuario no es encontrado o el parámetro es inválido, retorna un error.
 *
 * @param {Express.Request} req - La solicitud HTTP que contiene el `idUsuario` en el cuerpo.
 * @param {Express.Response} res - La respuesta HTTP para enviar el resultado al cliente.
 * @returns {Promise<void>} Responde con el usuario encontrado o un mensaje de error.
 */

exports.eliminarUsuario = async (req, res) => {
  const { lista_usuarios } = req.body;

  // Validar que todos los campos requeridos estén presentes
  if (!lista_usuarios || lista_usuarios.length === 0) {
    return;
  }

  try {
    // Llamar al repositorio para eliminar el usuario
    const resultado = await repositorio.eliminarUsuarios(lista_usuarios);

    if (resultado) {
      return res.status(MENSAJES_USUARIOS.USUARIOS_NO_ENCONTRADOS.codigo).json({
        mensaje: MENSAJES_USUARIOS.USUARIOS_NO_ENCONTRADOS.mensaje,
      });
    } else {
      return res.status(MENSAJES_USUARIOS.ERROR_ELIMINAR_USUARIO.codigo).json({
        mensaje: MENSAJES_USUARIOS.ERROR_ELIMINAR_USUARIO.mensaje,
      });
    }
  } catch (error) {
    console.error('Error al eliminar usuarios:', error);
    return res
      .status(MENSAJES_USUARIOS.ERROR_ELIMINAR_USUARIO.codigo)
      .json({ mensaje: MENSAJES_USUARIOS.ERROR_ELIMINAR_USUARIO.mensaje });
  }
};
