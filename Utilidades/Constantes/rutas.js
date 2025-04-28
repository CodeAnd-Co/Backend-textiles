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
    ELIMINAR: '/eliminar',
    LEER: '/consultar-usuario',
  },
  CATEGORIAS: {
    BASE: '/categorias',
    CONSULTAR_LISTA_CATEGORIAS: '/consultar-lista-categorias',
    CREAR_CATEGORIA: '/crear-categoria',
    ELIMINAR_CATEGORIA: '/eliminar',
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
    BASE: "/cuotas",
    AGREGAR: "/crear-cuota",
    OPCIONES: "/obtener-opciones",
    CONSULTAR_LISTA: "/consultar-lista",
  },
  ROLES: {
    BASE: '/roles',
    CONSULTAR_LISTA: '/consultar-lista',
  },
  API_DOCS: '/api-docs',
};
