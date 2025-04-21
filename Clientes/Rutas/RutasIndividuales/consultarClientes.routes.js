const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/cli/ctrl/consultarClientes.controller");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");
const autorizarToken = require("@altertex/util/inter/autorizarToken");
const verificarPermisos = require("@altertex/util/inter/verificarPermisos");

const PERMISOS = require("@altertex/util/const/permisos");
const RUTAS = require("@altertex/util/const/rutas");

ruteador.get(
  RUTAS.CLIENTES.CONSULTAR_LISTA,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.CONSULTAR_CLIENTES),
  controlador.consultarLista
);

module.exports = ruteador;
