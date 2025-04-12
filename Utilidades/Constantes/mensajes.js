const MENSAJES_AUTENTICACION = {
  // 200 - OK
  INICIO_SESION_EXITOSO: {
    codigo: 200,
    mensaje: "Inicio de sesión exitoso.",
  },
  CIERRE_SESION_EXITOSO: {
    codigo: 200,
    mensaje: "Sesión cerrada correctamente.",
  },

  // 201 - Created
  REGISTRO_ACCESO_EXITOSO: {
    codigo: 201,
    mensaje: "Acceso registrado exitosamente.",
  },

  // 204 - No Content
  SESION_NO_EXISTENTE: {
    codigo: 204,
    mensaje: "No había sesión activa para cerrar.",
  },

  // 400 - Bad Request
  CAMPOS_OBLIGATORIOS: {
    codigo: 400,
    mensaje: "Se necesita ingresar correo y contraseña.",
  },
  FORMATO_CORREO_INVALIDO: {
    codigo: 400,
    mensaje: "El formato del correo electrónico no es válido.",
  },
  CONTRASENIA_NO_SEGURA: {
    codigo: 400,
    mensaje: "La contraseña no cumple con los criterios de seguridad.",
  },
  TOKEN_NO_PROPORCIONADO: {
    codigo: 400,
    mensaje: "No se proporcionó un token de autenticación.",
  },

  // 401 - Unauthorized
  CREDENCIALES_INVALIDAS: {
    codigo: 401,
    mensaje: "Usuario o contraseña incorrectos.",
  },
  USUARIO_NO_AUTENTICADO: {
    codigo: 401,
    mensaje: "No se ha iniciado sesión.",
  },
  TOKEN_INVALIDO: {
    codigo: 401,
    mensaje: "El token proporcionado no es válido.",
  },
  TOKEN_EXPIRADO: {
    codigo: 401,
    mensaje: "La sesión ha expirado. Por favor, inicie sesión nuevamente.",
  },
  TOKEN_CORRUPTO: {
    codigo: 401,
    mensaje: "El token está dañado o tiene un formato incorrecto.",
  },
  API_KEY_INVALIDA: {
    codigo: 401,
    mensaje: "API Key inválida o no proporcionada.",
  },

  // 403 - Forbidden
  ACCESO_NO_AUTORIZADO: {
    codigo: 403,
    mensaje: "No tiene permisos para acceder a este recurso.",
  },

  // 404 - Not Found
  USUARIO_NO_ENCONTRADO: {
    codigo: 404,
    mensaje: "No se encontró un usuario con ese correo electrónico.",
  },

  // 409 - Conflict
  SESION_YA_INICIADA: {
    codigo: 409,
    mensaje: "Ya hay una sesión iniciada en este dispositivo.",
  },

  // 500 - Internal Server Error
  ERROR_SERVIDOR: {
    codigo: 500,
    mensaje: "Ocurrió un error inesperado. Intente de nuevo más tarde.",
  },
  ERROR_OBTENER_USUARIO: {
    codigo: 500,
    mensaje: "Error al obtener datos del usuario.",
  },
  ERROR_GENERAR_TOKEN: {
    codigo: 500,
    mensaje: "No se pudo generar el token de autenticación.",
  },
  ERROR_CIERRE_SESION: {
    codigo: 500,
    mensaje: "Hubo un problema al cerrar la sesión.",
  },
  ERROR_VALIDAR_TOKEN: {
    codigo: 500,
    mensaje: "Hubo un problema al validar el token.",
  },
};

module.exports = {
  MENSAJES_AUTENTICACION,
};
