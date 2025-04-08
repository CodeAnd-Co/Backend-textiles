const express = require("express");
const ruteador = express.Router();
const rutasSesion = require("./Rutas_individuales/autenticacionSesion.routes");
const rutasLogin = require("./Rutas_individuales/inicioSesion.routes");

ruteador.use("/api", rutasSesion);
ruteador.use("/api", rutasLogin);

module.exports = ruteador;
