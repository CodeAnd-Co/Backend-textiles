const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_GRUPO_EMPLEADOS = require('@altertex/util/const/consultasGrupoEmpleados');

/**
 * Función para obtener el grupo de empleados de un cliente específico.
 *
 * RF22 - Consulta Lista de Grupo Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF22
 *
 * @async
 * @function obtenerGrupoDeEmpleados
 * @param {number} idCliente - ID del cliente cuyo grupo de empleados se desea obtener.
 *
 * @returns {Promise<Array>} Lista de grupos de empleados del cliente.
 * - Si no se encuentran grupos, se retorna un array vacío.
 *
 * @throws {Error} Si ocurre un error al ejecutar la consulta o si no se encuentran resultados.
 */
exports.obtenerGrupoDeEmpleados = async (idCliente) => {
  const query = CONSULTAS_GRUPO_EMPLEADOS.OBTENER_LISTA;


  exports.existeGrupoConNombre = (nombreGrupo, idCliente) => {
  return new Promise((resolve, reject) => {
    conexion.query(CONSULTAS_GRUPO_EMPLEADOS.VALIDAR_NOMBRE_REPETIDO, [nombreGrupo, idCliente], (err, resultados) => {
      if (err) return reject(err);
      resolve(resultados.length > 0);
    });
  });
};

  try {
    const gruposDeEmpleados = await correrQuery(query, [idCliente]);

    return gruposDeEmpleados;
  } catch (error) {
    console.error('Error al obtener el grupo de empleados:', error);
    return [];
  }
};
