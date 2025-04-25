const correrQuery = require("@altertex/util/ser/correrQuery");
const ELIMINAR_EVENTO = require("@altertex/util/const/consultasEventos");

exports.eliminarEvento = async (clienteSeleccionado) => {
  const query = CONSULTAS_EVENTOS.ELIMINAR_EVENTO;

  try {
    const eventoEliminado = await correrQuery(query, [clienteSeleccionado]);
    return eventoEliminado;
  } catch (error) {
    console.error("Error al eliminar el evento:", error);
    throw error;
  }
};
