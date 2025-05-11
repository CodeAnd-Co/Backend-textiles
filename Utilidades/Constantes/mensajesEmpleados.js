module.exports = {
  // 200 - OK
  CONSULTA_EXITOSA: {
    codigo: 200,
    mensaje: 'Lista de empleados obtenida exitosamente.',
  },
  EXITO_ACTUALIZAR: {
    codigo: 200,
    mensaje: 'Actualización exitosa.',
  },

  // 204 - No Content
  SIN_RESULTADOS: {
    codigo: 204,
    mensaje: 'No se encontraron empleados registrados para el cliente.',
  },

  // 400 - Bad Request
  PARAMETROS_INVALIDOS: {
    codigo: 400,
    mensaje: 'Los parámetros proporcionados no son válidos o están incompletos.',
  },
  LIMITE_OFFSET_INVALIDOS: {
    codigo: 400,
    mensaje: 'Los valores de límite u offset deben ser números positivos.',
  },
  ERROR_ACTUALIZAR: {
    codigo: 400,
    mensaje: 'Error al actualizar',
  },

  // 403 - Forbidden
  PERMISO_DENEGADO: {
    codigo: 403,
    mensaje: 'No tiene permiso para consultar empleados de este cliente.',
  },

  // 500 - Internal Server Error
  ERROR_CONSULTAR_EMPLEADOS: {
    codigo: 500,
    mensaje: 'Ocurrió un error al obtener la lista de empleados.',
  },
  // 404 - Not Found
  EMPLEADO_NO_ENCONTRADO: {
    codigo: 404,
    mensaje: 'No se encontró el empleado especificado.',
  },
  // 200 - OK
  EMPLEADO_ELIMINADO: {
    codigo: 200,
    mensaje: 'Empleado(s) eliminado(s) correctamente.',
  },
  // 500 - Internal Server Error
  ERROR_ELIMINAR_EMPLEADO: {
    codigo: 500,
    mensaje: 'Error al eliminar los empleados.',
  },
};
