const swaggerJSDoc = require("swagger-jsdoc");

const opcionesSwagger = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Autenticación TEXT&LINES",
      version: "1.0.0",
      description: "Documentación de la API de autenticación para TEXT&LINES",
    },
    servers: [
      {
        url: process.env.LOCAL_URL_BACKEND || "http://localhost:5000",
      },
    ],
  },
  apis: ["@altertex/aut/rutasIndividuales/inicioSesion.routes"],
};

module.exports = swaggerJSDoc(opcionesSwagger);
