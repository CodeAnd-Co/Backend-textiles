const express = require("express");
const ruteador = express.Router();
const rutasProductos = require("@altertex/pro/rutasInd/consultarProductos.routes");

const RUTAS = require("@altertex/util/const/rutas");

ruteador.use(RUTAS.PRODUCTOS.BASE, rutasProductos);

module.exports = ruteador;
