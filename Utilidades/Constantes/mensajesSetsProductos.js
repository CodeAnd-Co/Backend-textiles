module.exports = {
  // 200 - OK
  CONSULTA_EXITOSA: {
    codigo: 200,
    mensaje: 'Lista de sets de productos obtenida exitosamente.',
  },
  SET_PRODUCTOS_ELIMINADO: {
    codigo: 200,
    mensaje: 'Set de productos eliminado correctamente.',
  },
  SET_PRODUCTOS_ACTUALIZADO: {
    codigo: 200,
    mensaje: 'Set de productos actualizado correctamente.',
  },

  // 204 - No Content
  SIN_RESULTADOS: {
    codigo: 204,
    mensaje: 'No se encontraron sets de productos registrados para el cliente.',
  },

  // 403 - Forbidden
  PERMISO_DENEGADO: {
    codigo: 403,
    mensaje: 'No tiene permiso para consultar sets de productos de este cliente.',
  },

  // 404 - No encontrado
  SET_PRODUCTO_NO_ENCONTRADO: {
    codigo: 404,
    mensaje: 'Set de productos no encontrado.',
  },

  // 500 - Internal Server Error
  ERROR_CONSULTAR_SETS_PRODUCTOS: {
    codigo: 500,
    mensaje: 'Ocurrió un error al obtener la lista de sets de productos.',
  },
  ERROR_ELIMINAR_SET_PRODUCTOS: {
    codigo: 500,
    mensaje: 'Ocurrió un error al eliminar el set de productos.',
  },
  ERROR_ACTUALIZAR_SET_PRODUCTOS: {
    codigo: 500,
    mensaje: 'Ocurrió un error al actualizar el set de productos',
  },
};
