const CONSULTAS = require('@altertex/util/const/consultasPedidos');
const correrQuery = require('@altertex/util/ser/correrQuery');
const MENSAJES = require('@altertex/util/const/mensajesPedidos');

/**
 * RF60 - Consulta Lista de Pedidos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF60
 * Consulta la lista de pedidos asociados a un cliente.
 *
 * @async
 * @function obteneLista
 * @param {number} idCliente - El ID del cliente para el cual se desean obtener los pedidos.
 * @returns {Promise<object[]>} Una promesa que se resuelve con un arreglo de objetos que representan los pedidos.
 * @throws {Error} Lanza un error si el ID del cliente es inválido o si ocurre un error al ejecutar la consulta.
 */
exports.obteneLista = async (idCliente) => {
  try {
    if (!idCliente || typeof idCliente !== 'number') {
      throw new Error(MENSAJES.ERROR_CONSULTAR_PEDIDOS.mensaje);
    }

    return correrQuery(CONSULTAS.OBTENER_LISTA, [idCliente]);
  } catch {
    throw new Error(MENSAJES.ERROR_CONSULTAR_PEDIDOS.mensaje);
  }
};
