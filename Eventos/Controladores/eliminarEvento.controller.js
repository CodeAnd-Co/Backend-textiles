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
    const idsEvento = req.body.idsEvento;

    if (!Array.isArray(idsEvento) || idsEvento.length === 0) {
      return res.status(MENSAJES_EVENTOS.EVENTO_NO_ENCONTRADO.codigo).json({
        mensaje: MENSAJES_EVENTOS.EVENTO_NO_ENCONTRADO.mensaje,
      });
    }

    let eliminados = 0;
    const noEncontrados = [];

    await Promise.all(
      idsEvento.map(async (idEvento) => {
        const resultadoEvento = await repositorio.eliminarEvento(idEvento);
        if (resultadoEvento.affectedRows === 0) {
          noEncontrados.push(idEvento);
        } else {
          eliminados += 1;
        }
      })
    );

    if (eliminados === 0) {
      return res.status(MENSAJES_EVENTOS.EVENTO_NO_ENCONTRADO.codigo).json({
        mensaje: MENSAJES_EVENTOS.EVENTO_NO_ENCONTRADO.mensaje,
        noEncontrados,
      });
    }

    return res.status(MENSAJES_EVENTOS.EVENTO_ELIMINADO.codigo).json({
      mensaje: MENSAJES_EVENTOS.EVENTO_ELIMINADO.mensaje,
      noEncontrados: noEncontrados.length ? noEncontrados : undefined,
    });
  } catch {
    return res.status(MENSAJES_EVENTOS.ERROR_ELIMINAR_EVENTO.codigo).json({
      mensaje: MENSAJES_EVENTOS.ERROR_ELIMINAR_EVENTO.mensaje,
    });
  }
};
