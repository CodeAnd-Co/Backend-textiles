const MENSAJES = require('@altertex/util/const/mensajesPagos');
const CONSULTAS = require('@altertex/util/const/consultasPagos');
const correrQuery = require('@altertex/util/ser/correrQuery');

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
