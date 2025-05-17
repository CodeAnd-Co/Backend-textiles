//RF40 Eliminar Evento - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF40]
const bd = require('@altertex/util/bd/db');
const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_EVENTOS = require('@altertex/util/const/consultasEventos');

/**
 * Elimina un evento específico de la base de datos
 * @function eliminarEvento
 * @param {number} idEvento - ID del evento a eliminar
 * @returns {object} - Resultado de la operación de eliminación
 */
exports.eliminarEvento = async (idEvento) => {
  const conexion = bd.promise();

  try {
    const resultadosEmpleadosEventos = await correrQuery(
      CONSULTAS_EVENTOS.ELIMINAR_EMPLEADO_EVENTO,
      [idEvento],
      conexion
    );
    const resultadosEventos = await correrQuery(
      CONSULTAS_EVENTOS.ELIMINAR_EVENTO,
      [idEvento],
      conexion
    );

    // No lances error, solo retorna el resultado
    await conexion.commit();
    return {
      affectedRows: resultadosEventos.affectedRows,
      resultadosEventos,
      resultadosEmpleadosEventos,
    };
  } catch {
    if (conexion) await conexion.rollback();
    throw new Error('Error eliminando evento');
  }
};
