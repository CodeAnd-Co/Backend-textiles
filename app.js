require("module-alias/register");
require("@altertex/config/dotenv");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const opcionesSwagger = require("@altertex/config/swagger");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");
const rutasAutenticacion = require("@altertex/aut/rutas/indexAutenticacion.routes");
const rutasProductos = require("@altertex/pro/rutas/indexProductos.routes");

const RUTAS = require("@altertex/util/const/rutas");

const puerto = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.LOCAL_URL, process.env.DEPLOYED_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get(
  RUTAS.RAIZ,
  revisarApiKey("x-api-key", "Api key invalida"),
  (req, res) => {
    res.status(201).json({
      message: `Proyecto TEXT&LINES ${process.env.NODE_ENV}`,
    });
  }
);

app.use(RUTAS.API, rutasAutenticacion);
app.use(RUTAS.API, rutasProductos);

const swaggerSpec = swaggerJSDoc(opcionesSwagger);
app.use(RUTAS.API_DOCS, swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.listen(puerto, () =>
  console.log(
    `Servidor corriendo en puerto ${puerto} [${process.env.NODE_ENV}]`
  )
);
