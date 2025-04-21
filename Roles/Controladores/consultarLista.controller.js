const repositorio = require("@altertex/rol/repos/repositorioRoles");
const MENSAJES_ROLES = require("@altertex/util/const/mensajesRoles");

exports.consultarLista = async (req, res) => {
  const limit = parseInt(req.body.limit);
  const offset = parseInt(req.body.offset);

  if (isNaN(limit) || isNaN(offset)) {
    return res
      .status(MENSAJES_ROLES.PARAMETROS_INVALIDOS.codigo)
      .json({ mensaje: MENSAJES_ROLES.PARAMETROS_INVALIDOS.mensaje });
  }

  if (limit <= 0 || offset < 0) {
    return res
      .status(MENSAJES_ROLES.LIMITE_OFFSET_INVALIDOS.codigo)
      .json({ mensaje: MENSAJES_ROLES.LIMITE_OFFSET_INVALIDOS.mensaje });
  }

  try {
    const resultados = await repositorio.obtenerRoles(limit, offset);

    if (!resultados || resultados.length === 0) {
      return res
        .status(MENSAJES_ROLES.SIN_RESULTADOS.codigo)
        .json({ mensaje: MENSAJES_ROLES.SIN_RESULTADOS.mensaje });
    }

    return res.status(MENSAJES_ROLES.CONSULTA_EXITOSA.codigo).json({
      mensaje: MENSAJES_ROLES.CONSULTA_EXITOSA.mensaje,
      roles: resultados,
    });
  } catch (error) {
    console.error("Error al consultar roles:", error);
    return res
      .status(MENSAJES_ROLES.ERROR_CONSULTAR_ROLES.codigo)
      .json({ mensaje: MENSAJES_ROLES.ERROR_CONSULTAR_ROLES.mensaje });
  }
};