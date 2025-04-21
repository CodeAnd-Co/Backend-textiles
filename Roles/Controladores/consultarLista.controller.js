// Importación del repositorio y constantes de mensajes relacionados a roles
const repositorio = require("@altertex/rol/repos/repositorioRoles");
const MENSAJES_ROLES = require("@altertex/util/const/mensajesRoles");

// Controlador para consultar la lista de roles
exports.consultarLista = async (req, res) => {
  const limit = parseInt(req.body.limit);
  const offset = parseInt(req.body.offset);

  // Validación de parámetros
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
    // Consulta al repositorio
    const resultados = await repositorio.obtenerRoles(limit, offset);

    // Validación de resultados vacíos
    if (!resultados || resultados.length === 0) {
      return res
        .status(MENSAJES_ROLES.SIN_RESULTADOS.codigo)
        .json({ mensaje: MENSAJES_ROLES.SIN_RESULTADOS.mensaje });
    }

    // Respuesta exitosa con datos
    return res.status(MENSAJES_ROLES.CONSULTA_EXITOSA.codigo).json({
      mensaje: MENSAJES_ROLES.CONSULTA_EXITOSA.mensaje,
      roles: resultados,
    });
  } catch (error) {
    // Manejo de error en la consulta
    console.error("Error al consultar roles:", error);
    return res
      .status(MENSAJES_ROLES.ERROR_CONSULTAR_ROLES.codigo)
      .json({ mensaje: MENSAJES_ROLES.ERROR_CONSULTAR_ROLES.mensaje });
  }
};