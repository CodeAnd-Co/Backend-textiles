//RF40 Eliminar Evento - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF40]
const db = require('@altertex/util/bd/db');
const CONSULTAS_EVENTOS = require('@altertex/util/const/consultasEventos');

/**
 * Elimina un evento específico de la base de datos
 * @function eliminarEvento
 * @param {number} idEvento - ID del evento a eliminar
 * @returns {object} - Resultado de la operación de eliminación
 */
exports.eliminarEvento = async (idEvento) => {
  const conexion = await db.getConnection();

  try {
    await conexion.beginTransaction();

    const [resultadosEmpleadosEventos] = await conexion.query(
      CONSULTAS_EVENTOS.ELIMINAR_EMPLEADO_EVENTO,
      [idEvento]
    );

    const [resultadosEventos] = await conexion.query(
      CONSULTAS_EVENTOS.ELIMINAR_EVENTO,
      [idEvento]
    );

    await conexion.commit();

    return {
      affectedRows: resultadosEventos.affectedRows,
      resultadosEventos,
      resultadosEmpleadosEventos,
    };
  } catch (error) {
    await conexion.rollback();
    throw new Error('Error eliminando evento');
  } finally {
    if (conexion) conexion.release();
  }
};