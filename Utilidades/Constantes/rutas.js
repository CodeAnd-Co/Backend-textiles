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
    ELIMINAR_PRODUCTO: "/eliminar",
  },
  SETS_PRODUCTOS: {
    BASE: '/sets-productos',
    CONSULTAR_LISTA: '/consultar-lista',
    ELIMINAR_SET_PRODUCTOS: '/eliminar',
  },
  CLIENTES: {
    BASE: '/clientes',
    CONSULTAR_SISTEMA: '/consultar-sistema',
    CONSULTAR_LISTA: '/consultar-lista',
    ELIMINAR_CLIENTE: '/eliminar',
    LEER: '/consultar-cliente',
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
    CONSULTAR_LISTA: '/consultar-lista',
  },
  ROLES: {
    BASE: '/roles',
    CONSULTAR_LISTA: '/consultar-lista',
    CREAR_ROL: '/crear-rol',
    OBTENER_OPCIONES: '/obtener-opciones',
    CONFIRMAR_CREACION: '/confirmar-creacion',
  },
  PEDIDOS: {
    BASE: '/pedidos',
    CONSULTAR_LISTA: '/consultar-lista',
  },
  API_DOCS: '/api-docs',
};