const dotenv = require("dotenv");
const envFile = `.env.${process.env.NODE_ENV || "staging"}`; // Defaults to 'development' if NODE_ENV is not set
dotenv.config({ path: envFile });
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const revisarApiKey = require("./util/middlewares/revisarApiKey");

// Archivos con las rutas
const rutasAutenticacion = require("./Auth/Rutas/indexAutenticacion.routes");

const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const app = express();

// Swagger config
const swaggerOptions = {
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
  apis: ["./Auth/Rutas/Rutas_individuales/inicioSesion.routes.js"], // Cambia según la estructura real de tus archivos
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.LOCAL_URL, process.env.DEPLOYED_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Ruta de bienvenida protegida con API key
const ambiente = process.env.NODE_ENV;
app.get(
  "/",
  revisarApiKey("x-api-key", "Api key invalida"),
  async (req, res) => {
    res.status(201).json({ message: `Proyecto TEXT&LINES ${ambiente}` });
  }
);

// Rutas de autenticación
app.use("/", rutasAutenticacion);

// Ruta de documentación Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Inicia el servidor
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(
    `Server corriendo en puerto: ${port} en ambiente de ${process.env.NODE_ENV}.`
  )
);
