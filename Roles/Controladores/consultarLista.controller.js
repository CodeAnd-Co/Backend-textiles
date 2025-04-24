// Importación del repositorio y constantes de mensajes relacionados a roles
const repositorio = require("@altertex/rol/repos/repositorioRoles");
const MENSAJES_ROLES = require("@altertex/util/const/mensajesRoles");

// Controlador para consultar la lista de roles
exports.consultarLista = async (req, res) => {
  try {
    // Consulta al repositorio
    const resultados = await repositorio.obtenerRoles();

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
    console.error(" Error inesperado al consultar roles:", error.message || error);
    return res.status(500).json({ mensaje: "Error al consultar roles" });
  }
};