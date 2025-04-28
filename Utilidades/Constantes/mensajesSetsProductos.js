module.exports = {
  // 200 - OK
  CONSULTA_EXITOSA: {
    codigo: 200,
    mensaje: 'Lista de sets de productos obtenida exitosamente.',
  },

  // 204 - No Content
  SIN_RESULTADOS: {
    codigo: 204,
    mensaje: 'No se encontraron sets de productos registrados para el cliente.',
  },

  // 400 - Bad Request
  PARAMETROS_INVALIDOS: {
    codigo: 400,
    mensaje: 'Los parámetros proporcionados no son válidos o están incompletos.',
  },

  // 403 - Forbidden
  PERMISO_DENEGADO: {
    codigo: 403,
    mensaje: 'No tiene permiso para consultar sets de productos de este cliente.',
  },

  // 500 - Internal Server Error
  ERROR_CONSULTAR_SETS_PRODUCTOS: {
    codigo: 500,
    mensaje: 'Ocurrió un error al obtener la lista de sets de productos.',
  },
};
