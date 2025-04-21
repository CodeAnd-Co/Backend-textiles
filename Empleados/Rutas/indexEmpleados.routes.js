const express = require("express");
const ruteador = express.Router();
const rutasConsultarLista = require("@altertex/emp/rutasInd/consultarLista.routes");

const RUTAS = require("@altertex/util/const/rutas");

ruteador.use(RUTAS.EMPLEADOS.BASE, rutasConsultarLista);

module.exports = ruteador;
