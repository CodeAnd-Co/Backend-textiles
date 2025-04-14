const repositorio = require("@altertex/usu/repos/repositorioConsultarListaUsuarios");
const MENSAJES_USUARIOS = require("@altertex/util/const/mensajesUsuarios");

exports.consultarListaUsuarios = async (req, res) => {
  const limit = parseInt(req.body.limit);
  const offset = parseInt(req.body.offset);

  if (isNaN(limit) || isNaN(offset)) {
    return res
      .status(MENSAJES_USUARIOS.PARAMETROS_INVALIDOS.codigo)
      .json({ mensaje: MENSAJES_USUARIOS.PARAMETROS_INVALIDOS.mensaje });
  }

  if (limit <= 0 || offset < 0) {
    return res
      .status(MENSAJES_USUARIOS.LIMITE_OFFSET_INVALIDOS.codigo)
      .json({ mensaje: MENSAJES_USUARIOS.LIMITE_OFFSET_INVALIDOS.mensaje });
  }

  try {
    const resultados = await repositorio.consultarListaUsuarios(limit, offset);

    if (!resultados || resultados.length === 0) {
      return res
        .status(MENSAJES_USUARIOS.USUARIOS_NO_ENCONTRADOS.codigo)
        .json({ mensaje: MENSAJES_USUARIOS.USUARIOS_NO_ENCONTRADOS.mensaje });
    }

    return res.status(MENSAJES_USUARIOS.LISTA_USUARIOS_OBTENIDA.codigo).json({
      mensaje: MENSAJES_USUARIOS.LISTA_USUARIOS_OBTENIDA.mensaje,
      lista_usuarios: resultados,
    });
  } catch (error) {
    console.error("Error al consultar usuarios:", error);
    return res
      .status(MENSAJES_USUARIOS.ERROR_OBTENER_USUARIOS.codigo)
      .json({ mensaje: MENSAJES_USUARIOS.ERROR_OBTENER_USUARIOS.mensaje });
  }
};
