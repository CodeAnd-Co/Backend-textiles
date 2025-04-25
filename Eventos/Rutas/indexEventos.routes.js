const express = require("express");
const ruteador = express.Router();
const rutasConsultarListaEventos = require("@altertex/eve/rutasInd/consultarListaEventos.routes");
const rutasEliminarEvento = require("@altertex/eve/rutasInd/eliminarEvento.routes");

const RUTAS = require("@altertex/util/const/rutas");

ruteador.use(RUTAS.EVENTOS.BASE, rutasConsultarListaEventos);
ruteador.use(RUTAS.EVENTOS.BASE, rutasEliminarEvento);

module.exports = ruteador;
