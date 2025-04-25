const express = require("express");
const ruteador = express.Router();
const rutaCrearCuota = require("@altertex/cuota/rutasInd/crearCuota.routes");
const rutaObtenerOpcionesCuota = require("@altertex/cuota/rutasInd/obtenerOpcionesCuotas.routes");

const RUTAS = require("@altertex/util/const/rutas");

ruteador.use(RUTAS.CUOTAS.BASE, rutaCrearCuota);
ruteador.use(RUTAS.CUOTAS.BASE, rutaObtenerOpcionesCuota);

module.exports = ruteador;
