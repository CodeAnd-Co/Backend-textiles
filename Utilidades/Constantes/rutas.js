const { ELIMINAR_USUARIO } = require('./permisos');

module.exports = {
  RAIZ: '/',
  API: '/api',
  AUTENTICACION: {
    BASE: '/autenticacion',
    INICIO_SESION: '/iniciar-sesion',
    REGISTRO: '/registro',
    CERRAR_SESION: '/cerrar-sesion',
    USUARIO_AUTENTICADO: '/autenticar',
  },
  USUARIOS: {
    BASE: '/usuarios',
    CONSULTAR_LISTA_USUARIOS: '/consultar-lista-usuarios',
    CREAR: '/crear',
    ELIMINAR_USUARIO: '/eliminar-usuario',
    LEER: '/consultar-usuario',
  },
  PRODUCTOS: {
    BASE: '/productos',
    CONSULTAR_LISTA: '/consultar-lista',
  },
  CLIENTES: {
    BASE: '/clientes',
    CONSULTAR_SISTEMA: '/consultar-sistema',
    CONSULTAR_LISTA: '/consultar-lista',
  },
  EMPLEADOS: {
    BASE: '/empleados',
    CONSULTAR_LISTA: '/consultar-lista',
    CONSULTAR_GRUPO: '/consultar-grupo',
  },
  CUOTAS: {
    BASE: '/cuotas',
    AGREGAR: '/crear-cuota',
    OPCIONES: '/obtener-opciones',
  },
<<<<<<< HEAD
  API_DOCS: '/api-docs',
=======
  ROLES: {
    BASE: "/roles",
    CONSULTAR_LISTA: "/consultar-lista",
  },
  API_DOCS: "/api-docs",
>>>>>>> 8a3003e0b8767cbcbfd0a311ab0b2ac11bf84ebf
};
