const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_EMPLEADOS = require('@altertex/util/const/consultasEmpleados');

/**
 * Función para obtener la lista de empleados de un cliente específico.
 *
 * RF17 - Consulta Lista Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF17
 *
 * @async
 * @function obtenerEmpleados
 * @param {number} idCliente - ID del cliente cuyos empleados se desean consultar.
 *
 * @returns {Promise<Array>} Lista de empleados del cliente.
 * - Si no se encuentran empleados, se retorna un array vacío.
 *
 * @throws {Error} Si ocurre un error al ejecutar la consulta o si no se encuentran resultados.
 */
exports.obtenerEmpleados = async (idCliente) => {
  const query = CONSULTAS_EMPLEADOS.OBTENER_LISTA;

  try {
    const empleados = await correrQuery(query, [idCliente]);

    if (!empleados || empleados.length === 0) {
      throw new Error('No hay empleados');
    }

    return empleados;
  } catch {
    return [];
  }
};
