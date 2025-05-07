module.exports = {
  // 200 - OK
  CONSULTA_EXITOSA: {
    codigo: 200,
    mensaje: "Información del cliente obtenida exitosamente.",
  },
  CONSULTA_LISTA_EXITOSA: {
    codigo: 200,
    mensaje: "Lista de clientes obtenida exitosamente.",
  },
  CLIENTE_ELIMINADO: {
    codigo: 200,
    mensaje: "Cliente eliminado exitosamente.",
  },

  // 204 - No Content
  CLIENTE_SIN_SISTEMA: {
    codigo: 204,
    mensaje: "El cliente no tiene un sistema registrado.",
  },
  LISTA_CLIENTES_VACIA: {
    codigo: 204,
    mensaje: "No hay clientes registrados actualmente.",
  },

  // 400 - Bad Request
  PARAMETROS_INVALIDOS: {
    codigo: 400,
    mensaje:
      "Los parámetros proporcionados no son válidos o están incompletos.",
  },
  FORMATO_ID_CLIENTE_INVALIDO: {
    codigo: 400,
    mensaje: "El ID del cliente debe ser un número entero válido.",
  },
  LISTA_CLIENTES_INVALIDA: {
    codigo: 400,
    mensaje:
      "La lista de clientes asociados es inválida o no contiene IDs numéricos válidos.",
  },
  CLIENTES_ASOCIADOS_NO_PROPORCIONADOS: {
    codigo: 400,
    mensaje: "No se proporcionó la lista de clientes asociados.",
  },
  CLIENTE_INVALIDO: {
    codigo: 400,
    mensaje: "El ID del cliente debe ser un número entero válido.",
  },
  

  // 403 - Forbidden
  ACCESO_NO_AUTORIZADO: {
    codigo: 403,
    mensaje: "No tiene permiso para consultar la información de este cliente.",
  },

  // 404 - Not Found
  CLIENTE_NO_ENCONTRADO: {
    codigo: 404,
    mensaje: "No se encontró un cliente con el ID proporcionado.",
  },
  SISTEMA_NO_ENCONTRADO: {
    codigo: 404,
    mensaje: "No se encontró el sistema asociado al cliente.",
  },

  // 500 - Internal Server Error
  ERROR_CONSULTAR_CLIENTE: {
    codigo: 500,
    mensaje: "Ocurrió un error al obtener la información del cliente.",
  },
  ERROR_CONSULTAR_SISTEMA: {
    codigo: 500,
    mensaje:
      "Ocurrió un error al obtener la información del sistema del cliente.",
  },
  ERROR_CONSULTAR_LISTA_CLIENTES: {
    codigo: 500,
    mensaje: "Ocurrió un error al obtener la lista de clientes.",
  },
  ERROR_ELIMINAR_CLIENTE: {
    codigo: 500,
    mensaje: 'Ocurrió un error al eliminar el cliente.',
  },


  // Crear cliente
  ERROR_CREAR_CLIENTE: {
    codigo: 500,
    mensaje: "Ocurrió un error al obtener la información del cliente.",
  },
  ERROR_CONSULTAR_SISTEMA: {
    codigo: 500,
    mensaje:
      "Ocurrió un error al obtener la información del sistema del cliente.",
  },
  ERROR_CONSULTAR_LISTA_CLIENTES: {
    codigo: 500,
    mensaje: "Ocurrió un error al obtener la lista de clientes.",
  },
  ERROR_ELIMINAR_CLIENTE: {
    codigo: 500,
    mensaje: 'Ocurrió un error al eliminar el cliente.',
  },
};