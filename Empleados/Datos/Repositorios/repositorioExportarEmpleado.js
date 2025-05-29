const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_EMPLEADOS = require('@altertex/util/const/consultasEmpleados');

/**
 * Consulta la lista de empleados con todos los datos necesarios para exportar en CSV.
 *
 * @function
 * @async
 * @returns {Promise<Array<object>>} Arreglo de empleados con sus datos combinados (usuario + empleado).
 *
 * @throws {Error} Lanza un error si ocurre un fallo al ejecutar la consulta a la base de datos.
 *
 * @see [RF59 - Documentación de requisitos](https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF59)
 */
exports.obtenerEmpleadosExportacion = () => {
  const query = CONSULTAS_EMPLEADOS.OBTENER_DATOS_EXPORTACION;
  return correrQuery(query);
};
