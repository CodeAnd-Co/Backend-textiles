const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_EMPLEADOS = require('@altertex/util/const/consultasEmpleados');

/**
 * Elimina un empleado y su usuario vinculado.
 *
 * @param {number} idEmpleado - ID del empleado a eliminar.
 * @returns {Promise<{affectedRows: number}>} Resultado de la eliminación del empleado.
 */
exports.eliminarEmpleado = async (idEmpleado) => {
  try {
    // 1. Obtener el idUsuario asociado al empleado
    const resultadoUsuario = await correrQuery(
      CONSULTAS_EMPLEADOS.OBTENER_ID_USUARIO_POR_EMPLEADO,
      [idEmpleado]
    );

    const idUsuario = resultadoUsuario[0]?.idUsuario;
    if (!idUsuario) {
      throw new Error(`No se encontró un usuario asociado al empleado con ID ${idEmpleado}`);
    }

    // 2. Eliminar el usuario
    await correrQuery('DELETE FROM usuario WHERE idUsuario = ?', [idUsuario]);

    // 3. Eliminar el empleado
    const resultado = await correrQuery(CONSULTAS_EMPLEADOS.ELIMINAR_EMPLEADO, [idEmpleado]);

    return resultado;
  } catch (error) {
    console.error('Error al eliminar empleado y usuario:', error.message);
    throw error;
  }
};