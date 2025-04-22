const express = require("express");
const ruteador = express.Router();
const rutaConsultar = require("@altertex/pro/rutasInd/consultarProductos.routes");

const RUTAS = require("@altertex/util/const/rutas");

ruteador.use(RUTAS.PRODUCTOS.BASE, rutaConsultar);

module.exports = ruteador;
