const express = require("express");
const ruteador = express.Router();
const rutasAutenticacionSesion = require("@altertex/aut/rutasInd/autenticacionSesion.routes");
const rutasInicioSesion = require("@altertex/aut/rutasInd/inicioSesion.routes");
const rutasCerrarSesion = require("@altertex/aut/rutasInd/cerrarSesion.routes");

const RUTAS = require("@altertex/util/const/rutas");

ruteador.use(RUTAS.AUTENTICACION.BASE, rutasAutenticacionSesion);
ruteador.use(RUTAS.AUTENTICACION.BASE, rutasInicioSesion);
ruteador.use(RUTAS.AUTENTICACION.BASE, rutasCerrarSesion);

module.exports = ruteador;
