// mensajesCuotas.js

module.exports = {
  // crearCuota
  FORMATO_INVALIDO: 'Formato de cuota set inválido',
  CREACION_EXITOSA: 'Cuota set creado exitosamente',
  ERROR_CREACION: 'Error creando cuota set',

  // obtenerOpcionesCuotas
  FALTA_ID_CLIENTE: 'No hay idCliente',
  OPCIONES_OBTENIDAS: 'Opciones producto para cuota',
  ERROR_OBTENIENDO_OPCIONES: 'Error obteniendo opciones',

  // validarCuotaSet
  NOMBRE_REQUERIDO: 'El campo "nombre" es obligatorio.',
  PRODUCTOS_REQUERIDOS: 'Debes enviar al menos un producto con su límite.',
  ID_PRODUCTO_INVALIDO: (pos) => `El producto en la posición ${pos} no tiene un idProducto válido.`,
  LIMITE_INVALIDO: (id) => `El producto "${id}" tiene un "limite" inválido.`,
  LIMITE_ACTUAL_INVALIDO: (id) => `El producto "${id}" tiene un "limiteActual" inválido.`,

  // consultarListaCuotas
  CONSULTA_EXITOSA: {
    codigo: 200,
    mensaje: 'Lista de sets de cuotas obtenida exitosamente.',
  },

  SIN_RESULTADOS: {
    codigo: 204,
    mensaje: 'No se encontraron sets de cuotas registrados para el cliente.',
  },

  PARAMETROS_INVALIDOS: {
    codigo: 400,
    mensaje: 'Falta el ID del cliente para realizar la consulta.',
  },

  ERROR_CONSULTAR_CUOTAS: {
    codigo: 500,
    mensaje: 'Error al consultar los sets de cuotas.',
  },

  SET_CUOTA_NO_ENCONTRADO: {
    codigo: 404,
    mensaje: 'Set de cuotas no encontrado.',
  },

  SET_CUOTA_ELIMINADO: {
    codigo: 200,
    mensaje: 'Set de cuotas eliminado correctamente.',
  },

  ERROR_ELIMINAR_SET_CUOTAS: {
    codigo: 500,
    mensaje: 'Ocurrió un error al eliminar el set de productos.',
  },

  ERROR_OBTENER_SET_CUOTA: {
    codigo: 500,
    mensaje: 'Error interno al obtener el set de cuotas.',
  },
};
