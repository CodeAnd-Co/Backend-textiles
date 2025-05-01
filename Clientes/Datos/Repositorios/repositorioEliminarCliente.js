const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_CLIENTES = require('@altertex/util/const/consultasClientes');

/**
 * Elimina un cliente de la base de datos.
 *
 * @async
 * @function eliminarClientePorId
 * @param {number} idCliente - ID del cliente a eliminar.
 * @returns {Promise<{affectedRows: number}>} Resultado de la operación con número de filas afectadas.
 * @throws {Error} Si ocurre un error durante la eliminación.
 * @see [RF15 - Elimina Cliente](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF15)
 */
exports.eliminarClientePorId = async (idCliente) => {
  const query = CONSULTAS_CLIENTES.ELIMINAR_CLIENTE;
  try {
    const resultado = await correrQuery(query, [idCliente]);
    return resultado;
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    throw error;
  }
};