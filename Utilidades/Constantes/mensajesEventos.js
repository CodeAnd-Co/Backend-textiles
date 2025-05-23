module.exports = {
  // 201 - Creado
  EVENTO_CREADO: {
    codigo: 201,
    mensaje: 'Evento creado correctamente.',
  },

  // 200 - OK
  EVENTO_OBTENIDO: {
    codigo: 200,
    mensaje: 'Información del evento obtenida exitosamente.',
  },
  LISTA_EVENTOS_OBTENIDA: {
    codigo: 200,
    mensaje: 'Lista de eventos obtenida exitosamente.',
  },
  EVENTO_ELIMINADO: {
    codigo: 200,
    mensaje: 'Evento eliminado correctamente.',
  },

  // 204 - Sin contenido
  CATEGORIAS_NO_ENCONTRADAS: {
    codigo: 204,
    mensaje: 'No se encontraron categorías registradas.',
  },
  EVENTOS_NO_ENCONTRADOS: {
    codigo: 204,
    mensaje: 'No se encontraron eventos registrados.',
  },

  // 400 - Bad Request
  DATOS_INCOMPLETOS: {
    codigo: 400,
    mensaje: 'Faltan campos requeridos para crear la categoría.',
  },
  NOMBRE_CATEGORIA_INVALIDO: {
    codigo: 400,
    mensaje: 'El nombre de la categoría proporcionado no es válido.',
  },
  CATEGORIA_YA_EXISTE: {
    codigo: 400,
    mensaje: 'Ya existe una categoría con ese nombre.',
  },
  PARAMETROS_INVALIDOS: {
    codigo: 400,
    mensaje: 'Los parámetros proporcionados no son válidos.',
  },
  NOMBRE_EVENTO_INVALIDO: {
    codigo: 400,
    mensaje: 'El nombre del evento proporcionado no es válido.',
  },
  EVENTO_YA_EXISTE: {
    codigo: 400,
    mensaje: 'Ya existe un evento con ese nombre.',
  },
  // 404 - No encontrado
  EVENTO_NO_ENCONTRADO: {
    codigo: 404,
    mensaje: 'No se encontró un evento con el ID proporcionado.',
  },

  // 500 - Error del servidor
  ERROR_CREAR_EVENTO: {
    codigo: 500,
    mensaje: 'Ocurrió un error al intentar crear el evento.',
  },
  ERROR_OBTENER_EVENTOS: {
    codigo: 500,
    mensaje: 'Ocurrió un error al obtener la lista de eventos.',
  },
  ERROR_OBTENER_EVENTO: {
    codigo: 500,
    mensaje: 'Ocurrió un error al obtener los datos del evento.',
  },
  ERROR_ELIMINAR_EVENTO: {
    codigo: 500,
    mensaje: 'Ocurrió un error al eliminar el evento.',
  },
  ERROR_INTERNO: {
    codigo: 500,
    mensaje: 'Ocurrió un error interno en el servidor.',
  },
};
