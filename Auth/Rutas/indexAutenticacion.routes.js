const express = require("express");
const ruteador = express.Router();
const rutasSesion = require("./Rutas_individuales/autenticacionSesion.routes");
const rutasLogin = require("./Rutas_individuales/inicioSesion.routes");
const rutasLogout = require("./Rutas_individuales/logout.routes");

ruteador.use("/api", rutasSesion);
ruteador.use("/api", rutasLogin);
ruteador.use("/api", rutasLogout);

module.exports = ruteador;
