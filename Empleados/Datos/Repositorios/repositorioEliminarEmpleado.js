const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_EMPLEADOS = require('@altertex/util/const/consultasEmpleados');

/**
 * Elimina un empleado de la base de datos.
 *
 * @async
 * @function eliminarEmpleado
 * @param {number} idEmpleado - ID del empleado a eliminar.
 * @returns {Promise<{affectedRows: number}>} Resultado de la operación con el número de filas afectadas.
 * @throws {Error} Si ocurre un error durante la operación.
 */
exports.eliminarEmpleado = async (idEmpleado) => {
  const query = CONSULTAS_EMPLEADOS.ELIMINAR_EMPLEADO;
  try {
    const resultado = await correrQuery(query, [idEmpleado]);
    return resultado;
  } catch (error) {
    console.error('Error al eliminar empleado:', error);
    throw error;
  }
};