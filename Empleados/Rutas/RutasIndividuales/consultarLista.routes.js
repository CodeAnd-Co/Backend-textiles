const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/emp/ctrl/consultarLista.controller");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");
const autorizarToken = require("@altertex/util/inter/autorizarToken");
const verificarPermisos = require("@altertex/util/inter/verificarPermisos");

const PERMISOS = require("@altertex/util/const/permisos");
const RUTAS = require("@altertex/util/const/rutas");

ruteador.post(
  RUTAS.EMPLEADOS.CONSULTAR_LISTA,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.CONSULTAR_GRUPOS_EMPLEADOS),
  controlador.consultarLista
);

module.exports = ruteador;
