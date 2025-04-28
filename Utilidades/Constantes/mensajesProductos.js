module.exports = {
  // 200 - OK
  CONSULTA_EXITOSA: {
    codigo: 200,
    mensaje: "Lista de productos obtenida exitosamente.",
  },

  // 204 - No Content
  SIN_RESULTADOS: {
    codigo: 204,
    mensaje: "No se encontraron productos registrados para el cliente.",
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
    mensaje: "No tiene permiso para consultar productos de este cliente.",
  },

  // 500 - Internal Server Error
  ERROR_CONSULTAR_PRODUCTOS: {
    codigo: 500,
    mensaje: "Ocurrió un error al obtener la lista de productos.",
  },

  // 200 - OK
  RESPUESTA_ELIMINAR_PRODUCTO_EXITOSA: {
    codigo: 200,
    mensaje: "Producto eliminado exitosamente.",
  },
  
  // 500 - Internal Server Error
  RESPUESTA_ERROR_GENERAL: {
    codigo: 500,
    mensaje: "Ocurrió un error al procesar la solicitud.",
  },
  
};
