// mensajesCuotas.js

module.exports = {
  // crearCuota
  FORMATO_INVALIDO: "Formato de cuota set inválido",
  CREACION_EXITOSA: "Cuota set creado exitosamente",
  ERROR_CREACION: "Error creando cuota set",

  // obtenerOpcionesCuotas
  FALTA_ID_CLIENTE: "No hay idCliente",
  OPCIONES_OBTENIDAS: "Opciones producto para cuota",
  ERROR_OBTENIENDO_OPCIONES: "Error obteniendo opciones",

  // validarCuotaSet
  NOMBRE_REQUERIDO: 'El campo "nombre" es obligatorio.',
  PRODUCTOS_REQUERIDOS: "Debes enviar al menos un producto con su límite.",
  ID_PRODUCTO_INVALIDO: (pos) =>
    `El producto en la posición ${pos} no tiene un idProducto válido.`,
  LIMITE_INVALIDO: (id) => `El producto "${id}" tiene un "limite" inválido.`,
  LIMITE_ACTUAL_INVALIDO: (id) =>
    `El producto "${id}" tiene un "limiteActual" inválido.`,
};
