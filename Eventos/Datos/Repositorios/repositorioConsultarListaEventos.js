const correrQuery = require("@altertex/util/ser/correrQuery");
const CONSULTAS_EVENTOS = require("@altertex/util/const/consultasEventos");

exports.consultarListaEventos = async () => {
  const query = CONSULTAS_EVENTOS.OBTENER_LISTA_EVENTOS;

  try {
    const listaEventos = await correrQuery(query);
    return listaEventos;
  } catch (error) {
    console.error("Error al obtener lista de eventos:", error);
    throw error;
  }
};
