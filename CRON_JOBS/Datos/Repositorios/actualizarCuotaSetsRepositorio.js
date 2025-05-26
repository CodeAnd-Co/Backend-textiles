/**
 *
 * RF31 - Crear Cuotas - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF31
 *
 * @file Función encargada de actualizar los límites y fechas de los cuota sets.
 *
 * @module repositorio/obtenerCuota
 *
 * @requires @altertex/util/bd/db
 * @requires @altertex/util/const/consultasCuotas
 */

const db = require('@altertex/util/bd/db');
const QUERY = require('@altertex/util/const/consultasCuotas');

/**
 * Actualiza los límites de productos de los cuota sets y sus fechas de última actualización.
 *
 * - Primero intenta resetear los límites (`QUERY.RESETEAR_LIMITES`).
 * - Si se realiza al menos una modificación, actualiza las fechas (`QUERY.ACTUALIZAR_FECHAS`).
 * - Si no se modifica ninguna fila, la transacción es revertida.
 *
 * @async
 * @function
 * @returns {Promise<object>} Resultado de la operación. Puede ser un mensaje de éxito o de error.
 *
 * @throws {Error} Si ocurre un fallo en la transacción de base de datos.
 */
exports.obtenerCuota = async () => {
  const conexion = await db.getConnection();

  try {
    await conexion.beginTransaction();

    const [resultadoReseteo] = await conexion.execute(QUERY.RESETEAR_LIMITES);

    if (resultadoReseteo.changedRows === 0) {
      await conexion.rollback();
      return {
        error: 'Ninguna columna se actualizo. No se actualizara la fecha.',
      };
    }

    await conexion.execute(QUERY.ACTUALIZAR_FECHAS);

    await conexion.commit();

    return { exito: 'Actualizacion exitosa' };
  } catch (error) {
    await conexion.rollback();
    console.error('Transacción fallida: ', error);
    throw new Error('Error actualizando cuota sets');
  } finally {
    if (conexion) conexion.release();
  }
};