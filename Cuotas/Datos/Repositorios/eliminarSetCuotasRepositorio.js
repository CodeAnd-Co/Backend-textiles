const db = require('@altertex/util/bd/db');
const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_CUOTAS = require('@altertex/util/const/consultasCuotas');

/**
 * Elimina un set de cuotas y sus relaciones con productos desde la base de datos.
 *
 * @async
 * @function eliminarSetCuotas
 * @param {number} idSetCuotas - ID del set de cuotas a eliminar.
 * @returns {Promise<object>} Objeto con mensaje de éxito y resultados de las operaciones SQL.
 * @throws {Error} Si ocurre un error durante la transacción.
 */
exports.eliminarSetCuotas = async (idSetCuotas) => {
  const conexion = db.promise();

  try {
    await conexion.beginTransaction();

    const resultadoProductosSetCuotas = await correrQuery(
      CONSULTAS_CUOTAS.ELIMINAR_CUOTA_SET_PRODUCTO,
      [idSetCuotas],
      conexion
    );

    const resultadoSetCuotas = await correrQuery(
      CONSULTAS_CUOTAS.ELIMINAR_CUOTA_SET,
      [idSetCuotas],
      conexion
    );

    if (resultadoSetCuotas.affectedRows === 0) {
      throw new Error(`Set de cuotas con ID ${idSetCuotas} no encontrado`);
    }

    await conexion.commit();

    return {
      mensaje: 'Set de cuotas eliminado correctamente',
      resultadoProductosSetCuotas,
      resultadoSetCuotas,
    };
  } catch {
    if (conexion) await conexion.rollback();
    throw new Error('Error eliminando set de cuotas');
  }
};

//Errores Npm Run Lint
