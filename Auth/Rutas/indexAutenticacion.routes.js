const express = require("express");
const ruteador = express.Router();
const rutasSesion = require("./Rutas_individuales/autenticacionSesion.routes");

ruteador.use("/api", rutasSesion);

module.exports = ruteador;
