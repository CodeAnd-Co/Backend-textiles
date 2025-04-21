const express = require("express");
const ruteador = express.Router();
const rutasConsultarLista = require("@altertex/rol/rutasInd/consultarLista.routes");

const RUTAS = require("@altertex/util/const/rutas");

ruteador.use(RUTAS.ROLES.BASE, rutasConsultarLista);

module.exports = ruteador;
