const { PRODUCTOS } = require('./rutas');

module.exports = {
  // 200 - OK
  CONSULTA_EXITOSA: {
    codigo: 200,
    mensaje: 'Lista de productos obtenida exitosamente.',
  },
  PRODUCTO_CREADO_EXITOSAMENTE: {
    codigo: 200,
    mensaje: 'Producto creado correctamente.',
  },

  // 204 - No Content
  SIN_RESULTADOS: {
    codigo: 204,
    mensaje: 'No se encontraron productos registrados para el cliente.',
  },
  PRODUCTOS_NO_ENCONTRADOS: {
    codigo: 204,
    mensaje: 'No se encontraron productos para exportar.',
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

  // 403 - Forbidden
  PERMISO_DENEGADO: {
    codigo: 403,
    mensaje: 'No tiene permiso para consultar productos de este cliente.',
  },

  // 500 - Internal Server Error
  ERROR_CONSULTAR_PRODUCTOS: {
    codigo: 500,
    mensaje: 'Ocurrió un error al obtener la lista de productos.',
  },
  ERROR_CREAR_PRODUCTO: {
    codigo: 500,
    mensaje: 'Ocurrió un error al crear el producto. Por favor, intente nuevamente más tarde.',
  },
  ERROR_ENVIAR_IMAGENES_S3: {
    codigo: 500,
    mensaje: 'Ocurrió un error al subir las imágenes al servidor. Intente nuevamente.',
  },
  ERROR_CREAR_VARIANTE: {
    codigo: 500,
    mensaje:
      'Ocurrió un error al crear una variante del producto. Verifique los datos de variantes.',
  },
  ERROR_CREAR_OPCION: {
    codigo: 500,
    mensaje: 'Ocurrió un error al crear una opción para la variante. Revise las opciones enviadas.',
  },

  ERROR_CREAR_IMAGEN_VARIANTE: {
    codigo: 500,
    mensaje:
      'Ocurrió un error al asociar la imagen con la variante. Verifique los datos de las imágenes de variantes.',
  },

  // 200 - OK
  RESPUESTA_ELIMINAR_PRODUCTO_EXITOSA: {
    codigo: 200,
    mensaje: 'Producto eliminado exitosamente.',
  },

  // 500 - Internal Server Error
  RESPUESTA_ERROR_GENERAL: {
    codigo: 500,
    mensaje: 'Ocurrió un error al procesar la solicitud.',
  },
  //LEER PRODUCTO
  ERROR_LEER_PRODUCTO: {
    codigo: 400,
    mensaje: 'Ocurrió un error al obtener la informacion del producto.',
  },
  LEER_PRODUCTO_EXITO: {
    codigo: 200,
    mensaje: 'Lista de productos consultada exitosamente.',
  },
  ID_INVALIDO: {
    codigo: 400,
    mensaje: 'No se proporciono el id del producto.',
  },
  ERROR_OBTENIENDO_INFORMACION: {
    codigo: 400,
    mensaje: 'Error obteniendo informacion del producto.',
  },
  PRODUCTO_NO_ENCONTRADO: {
    codigo: 400,
    mensaje: 'El producto solicitado no existe.',
  },
  ERROR_EXPORTACION: {
    codigo: 400,
    mensaje: 'Error al exportar la lista de productos.',
  },
};
