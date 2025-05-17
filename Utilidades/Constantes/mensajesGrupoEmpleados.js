module.exports = {
  // 200 - OK
  CONSULTA_EXITOSA: {
    codigo: 200,
    mensaje: 'Lista de grupos de empleados obtenida exitosamente.',
  },

  GRUPO_OBTENIDO: {
    codigo: 200,
    mensaje: 'Información del grupo de empleados obtenida exitosamente.',
  },

  // 204 - No Content
  SIN_RESULTADOS: {
    codigo: 204,
    mensaje: 'No se encontraron grupos de empleados registrados para el cliente.',
  },

  // 400 - Bad Request
  PARAMETROS_INVALIDOS: {
    codigo: 400,
    mensaje: 'Los parámetros proporcionados no son válidos o están incompletos.',
  },

  GRUPO_NO_ENCONTRADO: {
    codigo: 400,
    mensaje: 'No se encontró un grupo con el ID proporcionado.',
  },

  // 403 - Forbidden
  PERMISO_DENEGADO: {
    codigo: 403,
    mensaje: 'No tiene permiso para consultar grupos de empleados de este cliente.',
  },

  // 500 - Internal Server Error
  ERROR_CONSULTAR_GRUPOS: {
    codigo: 500,
    mensaje: 'Ocurrió un error al obtener la lista de grupos de empleados.',
  },

  ELIMINAR_GRUPO_EXITOSO: {
    codigo: 200,
    mensaje: 'Grupo de empleados eliminado exitosamente.',
  },
  ELIMINAR_GRUPO_ERROR: {
    codigo: 500,
    mensaje: 'Ocurrió un error al eliminar el grupo de empleados.',
  },
  ERROR_OBTENER_GRUPO: {
    codigo: 500,
    mensaje: 'Ocurrió un error al obtener los datos del grupo de empleados.',
  },
};
