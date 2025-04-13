module.exports = {
  // 200 - OK
  CONSULTA_EXITOSA: {
    codigo: 200,
    mensaje: "Lista de empleados obtenida exitosamente.",
  },

  // 204 - No Content
  SIN_RESULTADOS: {
    codigo: 204,
    mensaje: "No se encontraron empleados registrados para el cliente.",
  },

  // 400 - Bad Request
  PARAMETROS_INVALIDOS: {
    codigo: 400,
    mensaje:
      "Los parámetros proporcionados no son válidos o están incompletos.",
  },
  LIMITE_OFFSET_INVALIDOS: {
    codigo: 400,
    mensaje: "Los valores de límite u offset deben ser números positivos.",
  },

  // 403 - Forbidden
  PERMISO_DENEGADO: {
    codigo: 403,
    mensaje: "No tiene permiso para consultar empleados de este cliente.",
  },

  // 500 - Internal Server Error
  ERROR_CONSULTAR_EMPLEADOS: {
    codigo: 500,
    mensaje: "Ocurrió un error al obtener la lista de empleados.",
  },
};
