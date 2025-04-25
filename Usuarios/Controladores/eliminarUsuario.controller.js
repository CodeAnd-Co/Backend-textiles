// RF5 - Eliminar Usuario -  https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/rf5/

//const repositorio = require('@altertex/usu/repos/repositorioEliminarUsuario');
const MENSAJES_USUARIOS = require('@altertex/util/const/mensajesUsuarios');

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
      return res.status(MENSAJES_USUARIOS.USUARIO_ELIMINADO.codigo).json({
        mensaje: MENSAJES_USUARIOS.USUARIO_ELIMINADO.mensaje,
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
