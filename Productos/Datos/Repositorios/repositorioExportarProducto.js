const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_PRODUCTOS = require('@altertex/util/const/consultasProductos');

/**
 * Consulta la lista de productos seleccionados de un cliente para exportar en CSV.
 *
 * @param {number} idCliente
 * @param {number[]} idsProducto
 * @returns {Promise<Array<object>>}
 *
 * @see [RF58 - Documentación de requisitos](https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF58)
 */
exports.obtenerProductosExportacion = (idCliente, idsProducto) => {
  const placeholders = idsProducto.map(() => '?').join(', ');
  const query = CONSULTAS_PRODUCTOS.OBTENER_DATOS_EXPORTACION.replace('__IDS__', placeholders);
  return correrQuery(query, [idCliente, ...idsProducto]);
};
