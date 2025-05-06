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
  const query = CONSULTAS_EVENTOS.ELIMINAR_EVENTO;

  try {
    const resultado = await correrQuery(query, [idEvento, idCliente]);

    if (resultado && resultado.affectedRows > 0) {
      return { eliminado: true };
    }
    return { eliminado: false };
  } catch (error) {
    console.error('Error al eliminar evento:', error);
    throw error;
  }
};
