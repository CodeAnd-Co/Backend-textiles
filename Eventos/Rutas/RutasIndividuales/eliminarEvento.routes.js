const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/eve/ctrl/eliminarEvento.controller");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");
const autorizarToken = require("@altertex/util/inter/autorizarToken");
const verificarPermisos = require("@altertex/util/inter/verificarPermisos");

const PERMISOS = require("@altertex/util/const/permisos");
const RUTAS = require("@altertex/util/const/rutas");

ruteador.post(
  RUTAS.EVENTOS.ELIMINAR,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.ELIMINAR_EVENTO),
  controlador.eliminarEvento
);

module.exports = ruteador;
