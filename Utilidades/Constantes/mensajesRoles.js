/**
 * @file mensajesRoles.js
 * @description
 * Contiene las constantes de mensajes utilizadas para las respuestas HTTP
 * relacionadas con la entidad "Rol" en el backend.
 * Cada constante define un código de estado HTTP y un mensaje descriptivo,
 * lo cual facilita respuestas consistentes y claras desde los controladores.
 *
 * @exports CONSULTA_EXITOSA, SIN_RESULTADOS, PARAMETROS_INVALIDOS, 
 * LIMITE_OFFSET_INVALIDOS, ERROR_CONSULTAR_ROLES
 */

module.exports = {
  /**
   * Mensaje utilizado cuando la consulta de roles se realiza con éxito.
   *
   * @constant
   * @type {{codigo: number, mensaje: string}}
   */
  CONSULTA_EXITOSA: {
    codigo: 200,
    mensaje: 'Lista de roles obtenida exitosamente.',
  },

  /**
   * Mensaje utilizado cuando la consulta no devuelve ningún resultado.
   *
   * @constant
   * @type {{codigo: number, mensaje: string}}
   */
  SIN_RESULTADOS: {
    codigo: 204,
    mensaje: 'No se encontraron roles registrados para el cliente.',
  },

  /**
   * Mensaje utilizado cuando los parámetros de entrada son inválidos o faltan.
   *
   * @constant
   * @type {{codigo: number, mensaje: string}}
   */
  PARAMETROS_INVALIDOS: {
    codigo: 400,
    mensaje: 'Los parámetros proporcionados no son válidos o están incompletos.',
  },

  /**
   * Mensaje específico para errores relacionados con paginación.
   * Generalmente usado si el límite o el desplazamiento (offset) son inválidos.
   *
   * @constant
   * @type {{codigo: number, mensaje: string}}
   */
  LIMITE_OFFSET_INVALIDOS: {
    codigo: 400,
    mensaje: 'Los valores de límite u offset deben ser números positivos.',
  },

  /**
   * Mensaje de error general utilizado cuando ocurre un fallo inesperado
   * durante la consulta de roles en el backend.
   *
   * @constant
   * @type {{codigo: number, mensaje: string}}
   */
  ERROR_CONSULTAR_ROLES: {
    codigo: 500,
    mensaje: 'Ocurrió un error al obtener la lista de roles.',
  },

  NOMBRE_OBLIGATORIO: "El nombre del rol es obligatorio.",
  PERMISOS_OBLIGATORIOS: "Debes seleccionar al menos un permiso.",
  ROL_EXISTENTE: "Ya existe un rol con ese nombre.",
  ROL_CREADO: "Rol creado exitosamente.",
  ERROR_CREACION: "Error al crear el rol.",
  PERMISO_INVALIDO: (id) => `El permiso con ID "${id}" no existe.`,
  FALTA_ID_CLIENTE: 'Falta el ID del cliente',
  OPCIONES_OBTENIDAS: 'Permisos obtenidos correctamente',
  ERROR_OBTENIENDO_OPCIONES: 'Error al obtener permisos',

};