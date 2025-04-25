const correrQuery = require("@altertex/util/ser/correrQuery");
const CONSULTAS_CUOTAS = require("@altertex/util/const/consultasCuotas");

/**
 * Función para obtener el set de cuotas de un cliente específico.
 *
 * RF32 - Consulta Lista de Sets de Cuotas
 *
 * @async
 * @function obtenerCuotas
 * @param {number} idCliente - ID del cliente a consultar.
 *
 * @returns {Promise<Array>} Lista de sets de cuotas del cliente.
 */
exports.obtenerCuotas = async (idCliente) => {
  try {
    const resultado = await correrQuery(CONSULTAS_CUOTAS.OBTENER_CUOTAS, [
      idCliente,
    ]);

    return resultado || [];
  } catch (error) {
    console.error("Error al obtener cuotas:", error);
    return [];
  }
};