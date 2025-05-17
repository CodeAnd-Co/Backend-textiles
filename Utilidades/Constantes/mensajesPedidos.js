module.exports = {
  // 204 - Sin contenido
  SIN_RESULTADOS: {
    codigo: 204,
    mensaje: 'No se encontraron pedidos.',
  },
  // 200 - OK
  CONSULTA_EXITOSA: {
    codigo: 200,
    mensaje: 'Lista de pedidos obtenida exitosamente.',
  },
  PEDIDO_ELIMINADO: {
    codigo: 200,
    mensaje: 'Pedido eliminado correctamente.',
  },
  // 403 - Acceso denegado
  PERMISO_DENEGADO: {
    codigo: 403,
    mensaje: 'No tiene permiso para consultar pedidos de este cliente.',
  },
  // 404 - No encontrado
  PEDIDO_NO_ENCONTRADO: {
    codigo: 404,
    mensaje: 'No se encontró el pedido solicitado.',
  },
  // 500 - Error del servidor
  ERROR_CONSULTAR_PEDIDOS: {
    codigo: 500,
    mensaje: 'Ocurrió un error al obtener la lista de pedidos.',
  },
  ERROR_ELIMINAR_PEDIDO: {
    codigo: 500,
    mensaje: 'Ocurrió un error al eliminar el pedido.',
  },
};
