const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/eve/ctrl/consultarListaEventos.controller");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");
const autorizarToken = require("@altertex/util/inter/autorizarToken");
const verificarPermisos = require("@altertex/util/inter/verificarPermisos");

const PERMISOS = require("@altertex/util/const/permisos");
const RUTAS = require("@altertex/util/const/rutas");

ruteador.post(
  RUTAS.EVENTOS.CONSULTAR_LISTA_EVENTOS,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.CONSULTAR_EVENTOS),
  controlador.consultarListaEventos
);

module.exports = ruteador;
