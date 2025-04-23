const repositorio = require("@altertex/usu/repos/repositorioConsultarListaUsuarios");
const MENSAJES_USUARIOS = require("@altertex/util/const/mensajesUsuarios");

exports.consultarListaUsuarios = async (req, res) => {
  try {
    const resultados = await repositorio.consultarListaUsuarios();

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
