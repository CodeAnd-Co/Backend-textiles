const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_EMPLEADOS = require('@altertex/util/const/consultasEmpleados');

/**
 * Consulta la lista de empleados seleccionados de un cliente para exportar en CSV.
 *
 * @param {number} idCliente
 * @param {number[]} idsEmpleado
 * @returns {Promise<Array<object>>}
 * 
 * @see [RF59 - Documentación de requisitos](https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF59)
 */

exports.obtenerEmpleadosExportacion = (idCliente, idsEmpleado) => {
  const placeholders = idsEmpleado.map(() => '?').join(', ');
  const query = CONSULTAS_EMPLEADOS.OBTENER_DATOS_EXPORTACION.replace('__IDS__', placeholders);
  return correrQuery(query, [idCliente, ...idsEmpleado]);
};