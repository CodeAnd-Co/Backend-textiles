const correrQuery = require("@altertex/util/ser/correrQuery");
const CONSULTAS_CLIENTES = require("@altertex/util/const/consultasClientes");

/**
 * Obtiene la información de un cliente a partir de su ID.
 *
 * RF12 - Consulta Lista de Clientes - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF12
 *
 * @async
 * @function obtenerCliente
 * @param {number} idCliente - ID del cliente a buscar.
 *
 * @returns {Promise<Object|string>} Objeto con la información del cliente si se encuentra,
 * o un string con un mensaje de error si ocurre un fallo durante la operación.
 */
exports.obtenerCliente = async (idCliente) => {
  try {
    const query = CONSULTAS_CLIENTES.OBTENER_CLIENTE;
    const resultado = await correrQuery(query, [idCliente]);

    if (!resultado || resultado.length === 0) {
      return `No se encontró un cliente con el ID ${idCliente}`;
    }

    return resultado[0];
  } catch (error) {
    return `Error obteniendo cliente: ${error}`;
  }
};
