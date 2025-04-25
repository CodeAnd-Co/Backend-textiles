//RF40 Eliminar Evento - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF40]
const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_EVENTOS = require('@altertex/util/const/consultasEventos');

/**
 * @function eliminarEvento
 * @description Elimina un evento específico de la base de datos
 * @param {number} idEvento - ID del evento a eliminar
 * @param {number} idCliente - ID del cliente propietario del evento
 * @returns {Object} - Resultado de la operación de eliminación
 */
exports.eliminarEvento = async (idEvento, idCliente) => {
  const query = CONSULTAS_EVENTOS.ELIMINAR_EVENTO;

  try {
    const resultado = await correrQuery(query, [idEvento, idCliente]);

    // Verificar si se eliminó correctamente (affectedRows > 0)
    if (resultado && resultado.affectedRows > 0) {
      return { eliminado: true };
    }
    return { eliminado: false };
  } catch (error) {
    console.error('Error al eliminar evento:', error);
    throw error;
  }
};
