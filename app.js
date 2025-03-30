const dotenv = require("dotenv");
const envFile = `.env.${process.env.NODE_ENV || "staging"}`; // Defaults to 'development' if NODE_ENV is not set
dotenv.config({ path: envFile });

const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const revisarApiKey = require("./util/middlewares/revisarApiKey");

//Archivos con las rutas
const rutasAutenticacion = require("./Auth/Rutas/indexAutenticacion.routes");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [process.env.LOCAL_URL, process.env.DEPLOYED_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // ✅ Allow cookies
  })
);

app.use(cookieParser());

const ambiente = process.env.NODE_ENV;

app.get(
  "/",
  revisarApiKey("x-api-key", "Api key invalida"),
  async (req, res) => {
    res.status(201).json({ message: `Proyecto TEXT&LINES ${ambiente}` });
  }
);

app.use("/", rutasAutenticacion);

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(
    `Server corriendo en puerto: ${port} ${port} en ambiente de ${process.env.NODE_ENV}.`
  ));
