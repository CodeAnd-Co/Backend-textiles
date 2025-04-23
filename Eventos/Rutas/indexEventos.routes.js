const express = require("express");
const ruteador = express.Router();
const rutasConsultarListaEventos = require("@altertex/eve/rutasInd/consultarListaEventos.routes");

const RUTAS = require("@altertex/util/const/rutas");

ruteador.use(RUTAS.CATEGORIAS.BASE, rutasConsultarListaEventos);

module.exports = ruteador;
