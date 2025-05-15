module.exports = {
  // 200 - OK
  PROVEEDOR_CREADO_EXITOSAMENTE: {
    codigo: 200,
    mensaje: 'El proveedor fue creado exitosamente.',
  },
  CONSULTA_PROVEEDORES_EXITOSA: {
    codigo: 200,
    mensaje: 'Lista de proveedores obtenida exitosamente.',
  },
  PROVEEDOR_OBTENIDO_EXITOSAMENTE: {
    codigo: 200,
    mensaje: 'Información del proveedor obtenida exitosamente.',
  },

  // 204 - No Content
  LISTA_PROVEEDORES_VACIA: {
    codigo: 204,
    mensaje: 'No hay proveedores registrados actualmente.',
  },

  // 400 - Bad Request
  DATOS_PROVEEDOR_INVALIDOS: {
    codigo: 400,
    mensaje: 'Los datos del proveedor proporcionados son inválidos o están incompletos.',
  },

  // 403 - Forbidden
  ACCESO_NO_AUTORIZADO_PROVEEDORES: {
    codigo: 403,
    mensaje: 'No tiene permiso para consultar o modificar proveedores.',
  },

  // 404 - Not Found
  PROVEEDOR_NO_ENCONTRADO: {
    codigo: 404,
    mensaje: 'No se encontró un proveedor con el ID proporcionado.',
  },

  // 500 - Internal Server Error
  ERROR_CREAR_PROVEEDOR: {
    codigo: 500,
    mensaje: 'Ocurrió un error al intentar crear el proveedor.',
  },
  ERROR_CONSULTAR_PROVEEDORES: {
    codigo: 500,
    mensaje: 'Ocurrió un error al obtener la lista de proveedores.',
  },
  ERROR_CONSULTAR_PROVEEDOR: {
    codigo: 500,
    mensaje: 'Ocurrió un error al obtener la información del proveedor.',
  },
};
