module.exports = {
  //200 - OK
  EVENTO_OBTENIDO: {
    codigo: 200,
    mensaje: 'Evento obtenido exitosamente.',
  },

  //400 - Bad Request
  PARAMETROS_INVALIDOS: {
    codigo: 400,
    mensaje: 'Los parámetros proporcionados no son válidos.',
  },

  //401 - Sin autorización
  CREDENCIALES_INVALIDAS: {
    codigo: 401,
    mensaje: 'Credenciales inválidas.',
  },

  //404 - No encontrado
  EVENTO_NO_ENCONTRADO: {
    codigo: 404,
    mensaje: 'Evento no encontrado.',
  },

  //500 - Error interno del servidor
  ERROR_OBTENER_EVENTO: {
    codigo: 500,
    mensaje: 'Error interno del servidor al leer el evento.',
  },
};
