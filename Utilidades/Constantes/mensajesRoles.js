/**
 * Constantes de mensajes utilizadas para las respuestas relacionadas con los roles.
 * Incluye códigos HTTP y mensajes descriptivos para distintos escenarios.
 */

module.exports = {
  // Mensaje para una consulta exitosa
  CONSULTA_EXITOSA: {
    codigo: 200,
    mensaje: 'Lista de roles obtenida exitosamente.',
  },

  // Mensaje cuando no se encuentran resultados
  SIN_RESULTADOS: {
    codigo: 204,
    mensaje: 'No se encontraron roles registrados para el cliente.',
  },

  // Error por parámetros faltantes o inválidos
  PARAMETROS_INVALIDOS: {
    codigo: 400,
    mensaje: 'Los parámetros proporcionados no son válidos o están incompletos.',
  },

  // Error específico para paginación incorrecta
  LIMITE_OFFSET_INVALIDOS: {
    codigo: 400,
    mensaje: 'Los valores de límite u offset deben ser números positivos.',
  },

  // Error general del servidor al consultar roles
  ERROR_CONSULTAR_ROLES: {
    codigo: 500,
    mensaje: 'Ocurrió un error al obtener la lista de roles.',
  },
};