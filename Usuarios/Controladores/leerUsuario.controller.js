const repositorio = require("@altertex/usu/repos/repositorioLeerUsuario");
const MENSAJES_USUARIOS = require("@altertex/util/const/mensajesUsuarios");

exports.leerUsuario = async (req, res) => {
  const idUsuario = parseInt(req.params.idUsuario);

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
  } catch (error) {
    console.error("Error al consultar usuario:", error);
    return res
      .status(MENSAJES_USUARIOS.ERROR_OBTENER_USUARIO.codigo)
      .json({ mensaje: MENSAJES_USUARIOS.ERROR_OBTENER_USUARIO.mensaje });
  }
};
