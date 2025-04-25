const QUERY = require('@altertex/util/const/consultasCuotas');
const correrQuery = require('@altertex/util/ser/correrQuery');

/**
 * Obtiene las opciones de cuota disponibles para un cliente específico.
 *
 * Realiza una consulta a la base de datos usando el identificador de cliente (`idCliente`) para obtener las opciones de cuota
 * asociadas a ese cliente. Si ocurre un error durante la ejecución de la consulta, se captura y se lanza un nuevo error.
 *
 * @param {number} idCliente - El ID del cliente para el cual se obtienen las opciones de cuota.
 * @returns {Promise<Array>} Una promesa que resuelve con las opciones de cuota obtenidas de la base de datos.
 * @throws {Error} Si ocurre un error durante la ejecución de la consulta.
 */
exports.obtenerCuotaOpcion = async (idCliente) => {
  try {
    const resultado = await correrQuery(QUERY.OBTENER_OPCIONES, [idCliente]);
    return resultado;
  } catch (error) {
    console.log('Error obteniendo opciones', error);
    throw new Error('Error obteniendo opciones');
  }
};
