//RF40 Eliminar Evento - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF40]
const repositorio = require('@altertex/eve/repos/repositorioEliminarEvento');
const MENSAJES_EVENTOS = require('@altertex/util/const/mensajesEventos');

/**
 * Elimina un evento específico para un cliente
 * @function eliminarEvento
 * @param {object} req - Objeto de solicitud Express
 * @param {object} res - Objeto de respuesta Express
 * @returns {object} Respuesta JSON con confirmación o mensaje de error
 */
exports.eliminarEvento = async (req, res) => {
  try {
    const idEvento = parseInt(req.params.idEvento || req.body.idEvento);
    const idCliente = parseInt(req.user.clienteSeleccionado);

    if (isNaN(idEvento) || isNaN(idCliente)) {
      return res.status(MENSAJES_EVENTOS.PARAMETROS_INVALIDOS.codigo).json({
        mensaje: MENSAJES_EVENTOS.PARAMETROS_INVALIDOS.mensaje,
      });
    }

    // Llamar al repositorio para eliminar el evento
    const resultado = await repositorio.eliminarEvento(idEvento, idCliente);

    if (resultado.affectedRows === 0) {
      console.warn(`Evento con ID ${idEvento} no encontrado o ya eliminado`);
      return res.status(MENSAJES_EVENTOS.EVENTO_NO_ENCONTRADO.codigo).json({
        mensaje: MENSAJES_EVENTOS.EVENTO_NO_ENCONTRADO.mensaje,
      });
    }

    return res.status(MENSAJES_EVENTOS.EVENTO_ELIMINADO.codigo).json({
      mensaje: MENSAJES_EVENTOS.EVENTO_ELIMINADO.mensaje,
    });
  } catch (error) {
    console.error('Error al eliminar el evento:', error);
    return res.status(MENSAJES_EVENTOS.ERROR_ELIMINAR_EVENTO.codigo).json({
      mensaje: MENSAJES_EVENTOS.ERROR_ELIMINAR_EVENTO.mensaje,
    });
  }
};
