const express = require("express");
const ruteador = express.Router();
const rutasConsultarListaCategorias = require("@altertex/cat/rutasInd/consultarListaCategorias.routes");

const RUTAS = require("@altertex/util/const/rutas");

ruteador.use(RUTAS.CATEGORIAS.BASE, rutasConsultarListaCategorias);

module.exports = ruteador;