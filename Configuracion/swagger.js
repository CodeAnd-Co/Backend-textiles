const opcionesSwagger = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de TEXT&LINES',
      version: '1.0.0',
      description: 'Documentación de la API para TEXT&LINES',
    },
    servers: [
      {
        url: process.env.LOCAL_URL_BACKEND || 'http://localhost:5000',
      },
    ],
  },
  apis: [
    './Autenticacion/Rutas/RutasIndividuales/inicioSesion.routes.js',
    './Clientes/Rutas/RutasIndividuales/consultarSistema.routes.js',
    './Pedidos/Rutas/RutasIndividuales/obtenerPedidos.routes.js',
    './Roles/Rutas/RutasIndividuales/crearRol.routes.js',
  ],
};

module.exports = opcionesSwagger;
