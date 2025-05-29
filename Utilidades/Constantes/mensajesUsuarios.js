module.exports = {
  // 201 - Creado
  USUARIO_CREADO: {
    codigo: 201,
    mensaje: 'Usuario creado correctamente.',
  },

  // 200 - OK
  USUARIO_OBTENIDO: {
    codigo: 200,
    mensaje: 'Información del usuario obtenida exitosamente.',
  },
  LISTA_USUARIOS_OBTENIDA: {
    codigo: 200,
    mensaje: 'Lista de usuarios obtenida exitosamente.',
  },
  USUARIO_ACTUALIZADO: {
    codigo: 200,
    mensaje: 'Usuario actualizado correctamente.',
  },

  // 204 - Sin contenido
  USUARIOS_NO_ENCONTRADOS: {
    codigo: 204,
    mensaje: 'No se encontraron usuarios registrados.',
  },

  // 400 - Bad Request
  DATOS_INCOMPLETOS: {
    codigo: 400,
    mensaje: 'Faltan campos requeridos para crear el usuario.',
  },
  CORREO_INVALIDO: {
    codigo: 400,
    mensaje: 'El correo electrónico proporcionado no es válido.',
  },
  CONTRASENA_DEBIL: {
    codigo: 400,
    mensaje:
      'La contraseña debe tener al menos 8 caracteres y contener al menos un carácter especial.',
  },
  TELEFONO_INVALIDO: {
    codigo: 400,
    mensaje: 'El número de teléfono debe contener exactamente 10 dígitos.',
  },
  ROL_O_CLIENTE_INVALIDO: {
    codigo: 400,
    mensaje: 'El rol o el cliente especificado no es válido.',
  },
  USUARIO_YA_EXISTE: {
    codigo: 400,
    mensaje: 'Ya existe un usuario con este correo electrónico.',
  },
  PARAMETROS_INVALIDOS: {
    codigo: 400,
    mensaje: 'Los parámetros proporcionados no son válidos.',
  },

  // 401 - sin autorizacion
  CREDENCIALES_INVALIDAS: {
    codigo: 401,
    mensaje: 'Correo electrónico o contraseña incorrectos.',
  },

  // 403 - Denegado
  ACCESO_DENEGADO: {
    codigo: 403,
    mensaje: 'No tiene permiso para realizar esta acción sobre usuarios.',
  },

  // 404 - No encontrado
  USUARIO_NO_ENCONTRADO: {
    codigo: 404,
    mensaje: 'No se encontró un usuario con el ID proporcionado.',
  },

  // 500 - Server Error
  ERROR_CREAR_USUARIO: {
    codigo: 500,
    mensaje: 'Ocurrió un error al intentar crear el usuario. Probablemente ya existe.',
  },
  ERROR_OBTENER_USUARIOS: {
    codigo: 500,
    mensaje: 'Ocurrió un error al obtener la lista de usuarios.',
  },
  ERROR_OBTENER_USUARIO: {
    codigo: 500,
    mensaje: 'Ocurrió un error al obtener los datos del usuario.',
  },
  ERROR_ELIMINAR_USUARIO: {
    codigo: 500,
    mensaje: 'Ocurrió un error al intentar eliminar el usuario.',
  },
  ERROR_ACTUALIZAR_USUARIO: {
    codigo: 500,
    mensaje: 'Ocurrió un error al intentar actualizar el usuario.',
  },
};
