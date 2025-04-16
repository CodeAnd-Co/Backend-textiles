const express = require("express");
const ruteador = express.Router();
const rutaCrearCuota = require("@altertex/cuota/rutasInd/crearCuota.routes");

const RUTAS = require("@altertex/util/const/rutas");

ruteador.use(RUTAS.CUOTAS.BASE, rutaCrearCuota);

module.exports = ruteador;
