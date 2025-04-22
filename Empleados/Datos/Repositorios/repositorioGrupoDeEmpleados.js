const correrQuery = require("@altertex/util/ser/correrQuery");
const CONSULTAS_GRUPO_EMPLEADOS = require("@altertex/util/const/consultasGrupoEmpleados");

/**
 * Función para obtener el grupo de empleados de un cliente específico.
 *
 * RF17 - Obtener Grupo de Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF17
 *
 * @async
 * @function obtenerGrupoDeEmpleados
 * @param {number} idCliente - ID del cliente cuyo grupo de empleados se desea obtener.
 * @param {number} limit - Número máximo de resultados a devolver.
 * @param {number} offset - Número de resultados a omitir para paginación.
 *
 * @returns {Promise<Array>} Lista de grupos de empleados del cliente.
 * - Si no se encuentran grupos, se retorna un array vacío.
 *
 * @throws {Error} Si ocurre un error al ejecutar la consulta o si no se encuentran resultados.
 */

exports.obtenerGrupoDeEmpleados = async (idCliente, limit, offset) => {
  const query = CONSULTAS_GRUPO_EMPLEADOS.OBTENER_LISTA;

  try {
    const gruposDeEmpleados = await correrQuery(query, [
      idCliente,
      limit,
      offset,
    ]);

    if (!gruposDeEmpleados || gruposDeEmpleados.length === 0) {
      throw new Error("No hay grupos de empleados");
    }

    return gruposDeEmpleados;
  } catch (error) {
    console.error("Error al obtener el grupo de empleados:", error);
    return [];
  }
};
