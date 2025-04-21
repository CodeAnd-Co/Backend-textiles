const express = require("express");
const ruteador = express.Router();
const rutasConsultarSistema = require("@altertex/cli/rutasInd/consultarSistema.routes");
const rutasConsultarClientes = require("@altertex/cli/rutasInd/consultarClientes.routes");

const RUTAS = require("@altertex/util/const/rutas");

ruteador.use(RUTAS.CLIENTES.BASE, rutasConsultarSistema);
ruteador.use(RUTAS.CLIENTES.BASE, rutasConsultarClientes);

module.exports = ruteador;
