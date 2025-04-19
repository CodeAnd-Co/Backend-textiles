module.exports = {
  // 201 - Creado
  CATEGORIA_CREADA: {
    codigo: 201,
    mensaje: "Categoría creada correctamente.",
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

  // 204 - Sin contenido
  CATEGORIAS_NO_ENCONTRADAS: {
    codigo: 204,
    mensaje: "No se encontraron categorías registradas.",
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
    mensaje: "Los valores de límite u offset deben ser números enteros positivos mayores a cero.",
  },

  // 401 - No autorizado
  CREDENCIALES_INVALIDAS: {
    codigo: 401,
    mensaje: "Credenciales inválidas para consultar categorías.",
  },

  // 403 - Acceso denegado
  ACCESO_DENEGADO: {
    codigo: 403,
    mensaje: "No tiene permiso para realizar esta acción sobre categorías.",
  },

  // 404 - No encontrado
  CATEGORIA_NO_ENCONTRADA: {
    codigo: 404,
    mensaje: "No se encontró una categoría con el ID proporcionado.",
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
  }
};
