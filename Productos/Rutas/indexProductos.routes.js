const express = require("express");
const ruteador = express.Router();
const rutasProductos = require("./Rutas_individuales/consultarProductos.routes");

ruteador.use("/api", rutasProductos);

module.exports = ruteador;
