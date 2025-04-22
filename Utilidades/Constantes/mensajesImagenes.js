// Mensajes para consulta de imágenes en S3
module.exports = {
  // 200 - OK
  IMAGEN_CARGADA_EXITOSAMENTE: {
    codigo: 200,
    mensaje: "La imagen fue cargada exitosamente desde el repositorio.",
  },
  LISTA_IMAGENES_OBTENIDA: {
    codigo: 200,
    mensaje:
      "Las imágenes fueron obtenidas correctamente desde el repositorio.",
  },

  // 204 - No Content
  IMAGEN_NO_DISPONIBLE: {
    codigo: 204,
    mensaje: "No se encontró una imagen disponible para este recurso.",
  },

  // 400 - Bad Request
  PARAMETROS_IMAGEN_INVALIDOS: {
    codigo: 400,
    mensaje:
      "Los parámetros para la consulta de imagen son inválidos o están incompletos.",
  },
  FORMATO_NOMBRE_IMAGEN_INVALIDO: {
    codigo: 400,
    mensaje: "El nombre de la imagen tiene un formato inválido.",
  },

  // 403 - Forbidden
  ACCESO_NO_AUTORIZADO_IMAGEN: {
    codigo: 403,
    mensaje: "No tiene permiso para acceder a esta imagen.",
  },

  // 404 - Not Found
  IMAGEN_NO_ENCONTRADA: {
    codigo: 404,
    mensaje: "No se encontró la imagen solicitada en el repositorio.",
  },

  // 500 - Internal Server Error
  ERROR_CONSULTAR_IMAGEN: {
    codigo: 500,
    mensaje: "Ocurrió un error al intentar obtener la imagen desde S3.",
  },
  ERROR_LISTAR_IMAGENES: {
    codigo: 500,
    mensaje: "Ocurrió un error al intentar obtener la lista de imágenes.",
  },
};
