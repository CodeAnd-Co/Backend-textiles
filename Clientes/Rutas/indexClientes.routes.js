const express = require("express");
const ruteador = express.Router();
const rutasConsultarSistema = require("@altertex/cli/rutasInd/consultarSistema.routes");

const RUTAS = require("@altertex/util/const/rutas");

ruteador.use(RUTAS.CLIENTES.BASE, rutasConsultarSistema);

module.exports = ruteador;
