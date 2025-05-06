//RF40 Eliminar Evento - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF40]
const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_EVENTOS = require('@altertex/util/const/consultasEventos');

/**
 * Elimina un evento específico de la base de datos
 * @function eliminarEvento
 * @param {number} idEvento - ID del evento a eliminar
 * @param {number} idCliente - ID del cliente propietario del evento
 * @returns {object} - Resultado de la operación de eliminación
 */
exports.eliminarEvento = async (idEvento, idCliente) => {
  const query1 = CONSULTAS_EVENTOS.ELIMINAR_EMPLEADO_EVENTO;
  const query2 = CONSULTAS_EVENTOS.ELIMINAR_EVENTO;

  try {
    // Verificar si el evento existe
    await correrQuery(query1, [idEvento]);

    const resultado = await correrQuery(query2, [idEvento, idCliente]);

    if (resultado && resultado.affectedRows > 0) {
      return { eliminado: true };
    }
    return { eliminado: false };
  } catch (error) {
    console.error('Error al eliminar evento:', error);
    throw error;
  }
};
