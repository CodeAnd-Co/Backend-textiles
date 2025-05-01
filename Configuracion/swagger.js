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
<<<<<<< HEAD
  apis: ['./Autenticacion/Rutas/RutasIndividuales/inicioSesion.routes.js'],
=======
  apis: [
    './Autenticacion/Rutas/RutasIndividuales/inicioSesion.routes.js',
    './Clientes/Rutas/RutasIndividuales/consultarSistema.routes.js',
    './Pedidos/Rutas/RutasIndividuales/obtenerPedidos.routes.js',
  ],
>>>>>>> 6dbdf781e9faeea5066265607bdd5851cb15b109
};

module.exports = opcionesSwagger;
