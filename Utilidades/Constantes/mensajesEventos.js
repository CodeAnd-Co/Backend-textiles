module.exports = {
  // 201 - Creado
  CATEGORIA_CREADA: {
    codigo: 201,
    mensaje: "Categoría creada correctamente.",
  },
  EVENTO_CREADO: {
    codigo: 201,
    mensaje: "Evento creado correctamente.",
  },

  // 200 - OK
  CATEGORIA_OBTENIDA: {
    codigo: 200,
    mensaje: "Información de la categoría obtenida exitosamente.",
  },
  LISTA_CATEGORIAS_OBTENIDA: {
    codigo: 200,
    mensaje: "Lista de categorías obtenida exitosamente.",
  },
  EVENTO_OBTENIDO: {
    codigo: 200,
    mensaje: "Información del evento obtenida exitosamente.",
  },
  LISTA_EVENTOS_OBTENIDA: {
    codigo: 200,
    mensaje: "Lista de eventos obtenida exitosamente.",
  },

  // 204 - Sin contenido
  CATEGORIAS_NO_ENCONTRADAS: {
    codigo: 204,
    mensaje: "No se encontraron categorías registradas.",
  },
  EVENTOS_NO_ENCONTRADOS: {
    codigo: 204,
    mensaje: "No se encontraron eventos registrados.",
  },

  // 400 - Bad Request
  DATOS_INCOMPLETOS: {
    codigo: 400,
    mensaje: "Faltan campos requeridos para crear la categoría.",
  },
  NOMBRE_CATEGORIA_INVALIDO: {
    codigo: 400,
    mensaje: "El nombre de la categoría proporcionado no es válido.",
  },
  CATEGORIA_YA_EXISTE: {
    codigo: 400,
    mensaje: "Ya existe una categoría con ese nombre.",
  },
  PARAMETROS_INVALIDOS: {
    codigo: 400,
    mensaje: "Los parámetros proporcionados no son válidos.",
  },
  LIMITE_OFFSET_INVALIDOS: {
    codigo: 400,
    mensaje:
      "Los valores de límite u offset deben ser números enteros positivos mayores a cero.",
  },
  NOMBRE_EVENTO_INVALIDO: {
    codigo: 400,
    mensaje: "El nombre del evento proporcionado no es válido.",
  },
  EVENTO_YA_EXISTE: {
    codigo: 400,
    mensaje: "Ya existe un evento con ese nombre.",
  },

  // 401 - No autorizado
  CREDENCIALES_INVALIDAS: {
    codigo: 401,
    mensaje: "Credenciales inválidas para consultar categorías.",
  },
  CREDENCIALES_INVALIDAS: {
    codigo: 401,
    mensaje: "Credenciales inválidas para consultar eventos.",
  },

  // 403 - Acceso denegado
  ACCESO_DENEGADO: {
    codigo: 403,
    mensaje: "No tiene permiso para realizar esta acción sobre categorías.",
  },
  ACCESO_DENEGADO: {
    codigo: 403,
    mensaje: "No tiene permiso para realizar esta acción sobre eventos.",
  },

  // 404 - No encontrado
  CATEGORIA_NO_ENCONTRADA: {
    codigo: 404,
    mensaje: "No se encontró una categoría con el ID proporcionado.",
  },
  EVENTO_NO_ENCONTRADO: {
    codigo: 404,
    mensaje: "No se encontró un evento con el ID proporcionado.",
  },

  // 500 - Error del servidor
  ERROR_CREAR_CATEGORIA: {
    codigo: 500,
    mensaje: "Ocurrió un error al intentar crear la categoría.",
  },
  ERROR_OBTENER_CATEGORIAS: {
    codigo: 500,
    mensaje: "Ocurrió un error al obtener la lista de categorías.",
  },
  ERROR_OBTENER_CATEGORIA: {
    codigo: 500,
    mensaje: "Ocurrió un error al obtener los datos de la categoría.",
  },
  ERROR_CREAR_EVENTO: {
    codigo: 500,
    mensaje: "Ocurrió un error al intentar crear el evento.",
  },
  ERROR_OBTENER_EVENTOS: {
    codigo: 500,
    mensaje: "Ocurrió un error al obtener la lista de eventos.",
  },
  ERROR_OBTENER_EVENTO: {
    codigo: 500,
    mensaje: "Ocurrió un error al obtener los datos del evento.",
  },
};
