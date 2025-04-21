const correrQuery = require("@altertex/util/ser/correrQuery");
const CONSULTAS_CLIENTES = require("@altertex/util/const/consultasClientes");

/**
 * Obtiene la lista completa de clientes registrados.
 *
 * @async
 * @function obtenerListaClientes
 * @returns {Promise<Object[]|string>} Arreglo con la información de todos los clientes,
 * o un string con un mensaje de error si ocurre un fallo durante la operación.
 */
exports.obtenerLista = async () => {
  try {
    const query = CONSULTAS_CLIENTES.OBTENER_LISTA;
    const resultado = await correrQuery(query);

    return resultado;
  } catch (error) {
    return `Error obteniendo lista de clientes: ${error}`;
  }
};
