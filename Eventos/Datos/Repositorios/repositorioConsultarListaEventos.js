//RF37 Consulta Lista de Eventos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF37]
const correrQuery = require("@altertex/util/ser/correrQuery");
const CONSULTAS_EVENTOS = require("@altertex/util/const/consultasEventos");

/**
 * @function consultarListaEventos
 * @description Obtiene la lista de eventos de un cliente específico de la base de datos
 * @param {number} clienteSeleccionado - ID del cliente seleccionado
 * @returns {Array} - Lista de eventos encontrados
 */
exports.consultarListaEventos = async (clienteSeleccionado) => {
  const query = CONSULTAS_EVENTOS.OBTENER_LISTA_EVENTOS;

  try {
    const listaEventos = await correrQuery(query, [clienteSeleccionado]);
    return listaEventos;
  } catch (error) {
    console.error("Error al obtener lista de eventos:", error);
    throw error;
  }
};
