const MENSAJES = require('@altertex/util/const/mensajesPagos');
const CONSULTAS = require('@altertex/util/const/consultasPagos');
const correrQuery = require('@altertex/util/ser/correrQuery');

//RF[52] Consulta Lista de Pago - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF52]

/**
 * Repositorio para consultar la lista de métodos de pago habilitados para un cliente.
 *
 * Ejecuta una consulta SQL que devuelve los tipos de pago disponibles para el cliente especificado.
 *
 * @function consutlarTipoPago
 * @async
 * @param {number|string} cliente - Identificador del cliente cuyos métodos de pago se desean consultar.
 * @throws {Error} Si no se proporciona un cliente o si ocurre un error durante la consulta.
 * @returns {Promise<Array<object>>} Promesa que resuelve con un arreglo de objetos que representan los métodos de pago.
 */
exports.consutlarTipoPago = async (cliente) => {
  if (!cliente) {
    throw new Error(MENSAJES.ERROR_CONSULTA.mensaje);
  }
  try {
    const listaTipoPagos = await correrQuery(CONSULTAS.CONSULTAR_LISTA, [cliente]);
    return listaTipoPagos;
  } catch {
    throw new Error(MENSAJES.ERROR_CONSULTA.mensaje);
  }
};
