//RF40 Eliminar Evento - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF40]
const repositorio = require("@altertex/eve/repos/repositorioEliminarEvento");
const MENSAJES_EVENTOS = require("@altertex/util/const/mensajesEventos");

/**
 * @function eliminarEvento
 * @description Elimina un evento específico para un cliente
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 * @returns {Object} Respuesta JSON con confirmación o mensaje de error
 */
exports.eliminarEvento = async (req, res) => {
  try {
    const idEvento = parseInt(req.params.idEvento || req.body.idEvento);
    const idCliente = parseInt(req.user.clienteSeleccionado);

    // Validar parámetros
    if (isNaN(idEvento)) {
      return res.status(MENSAJES_EVENTOS.PARAMETROS_INVALIDOS.codigo).json({
        mensaje: "ID del evento no válido o no proporcionado",
      });
    }

    if (isNaN(idCliente)) {
      return res.status(MENSAJES_EVENTOS.PARAMETROS_INVALIDOS.codigo).json({
        mensaje: "ID del cliente no válido o no seleccionado",
      });
    }

    // Llamar al repositorio para eliminar el evento
    const resultado = await repositorio.eliminarEvento(idEvento, idCliente);

    if (!resultado || !resultado.eliminado) {
      return res.status(MENSAJES_EVENTOS.EVENTO_NO_ENCONTRADO.codigo).json({
        mensaje: MENSAJES_EVENTOS.EVENTO_NO_ENCONTRADO.mensaje,
      });
    }

    return res.status(200).json({
      mensaje: "Evento eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar evento:", error);
    return res
      .status(MENSAJES_EVENTOS.ERROR_ELIMINAR_EVENTO.codigo || 500)
      .json({
        mensaje:
          MENSAJES_EVENTOS.ERROR_ELIMINAR_EVENTO.mensaje ||
          "Error al eliminar el evento",
      });
  }
};
