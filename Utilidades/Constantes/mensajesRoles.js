module.exports = {
    CONSULTA_EXITOSA: {
      codigo: 200,
      mensaje: "Lista de roles obtenida exitosamente.",
    },
    SIN_RESULTADOS: {
      codigo: 204,
      mensaje: "No se encontraron roles registrados para el cliente.",
    },
    PARAMETROS_INVALIDOS: {
      codigo: 400,
      mensaje: "Los parámetros proporcionados no son válidos o están incompletos.",
    },
    LIMITE_OFFSET_INVALIDOS: {
      codigo: 400,
      mensaje: "Los valores de límite u offset deben ser números positivos.",
    },
    ERROR_CONSULTAR_ROLES: {
      codigo: 500,
      mensaje: "Ocurrió un error al obtener la lista de roles.",
    },
    RUTAS: {
      SISTEMA_ADMINISTRATIVO: {
        USUARIOS: {
          BASE: "/admin/usuarios",
          CONSULTAR_ROLES: "/consultar-roles",
        }
      }
    },
  };