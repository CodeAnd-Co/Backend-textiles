const repositorio = require('@altertex/usu/repos/repositorioLeerUsuario');
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
 *
 * @see [RF03 Leer usuario](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF3)
 */
exports.leerUsuario = async (req, res) => {
  const idUsuario = parseInt(req.body.idUsuario);

  if (isNaN(idUsuario)) {
    return res
      .status(MENSAJES_USUARIOS.PARAMETROS_INVALIDOS.codigo)
      .json({ mensaje: MENSAJES_USUARIOS.PARAMETROS_INVALIDOS.mensaje });
  }

  try {
    const usuario = await repositorio.obtenerUsuarioPorId(idUsuario);

    if (!usuario) {
      return res
        .status(MENSAJES_USUARIOS.USUARIO_NO_ENCONTRADO.codigo)
        .json({ mensaje: MENSAJES_USUARIOS.USUARIO_NO_ENCONTRADO.mensaje });
    }

    return res.status(MENSAJES_USUARIOS.USUARIO_OBTENIDO.codigo).json({
      mensaje: MENSAJES_USUARIOS.USUARIO_OBTENIDO.mensaje,
      usuario,
    });
  } catch {
    return res
      .status(MENSAJES_USUARIOS.ERROR_OBTENER_USUARIO.codigo)
      .json({ mensaje: MENSAJES_USUARIOS.ERROR_OBTENER_USUARIO.mensaje });
  }
};
