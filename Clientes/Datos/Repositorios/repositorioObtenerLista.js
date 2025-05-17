const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_CLIENTES = require('@altertex/util/const/consultasClientes');

/**
 * Obtiene la lista de clientes asociados según los IDs proporcionados.
 *
 * @async
 * @function obtenerLista
 * @param {number[]} clientesAsociados - Arreglo de IDs de clientes asociados al usuario.
 * @returns {Promise<object[]|string>} Arreglo con la información de los clientes,
 * o un string con un mensaje de error si ocurre un fallo durante la operación.
 */
exports.obtenerLista = async (clientesAsociados) => {
  try {
    const query = CONSULTAS_CLIENTES.OBTENER_LISTA;

    const resultado = await correrQuery(query, [clientesAsociados]);

    return resultado;
  } catch (error) {
    return `Error obteniendo lista de clientes: ${error}`;
  }
};
