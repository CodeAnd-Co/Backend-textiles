const express = require('express');
const controlador = require('@altertex/cuota/ctrl/actualizarSetCuotas.controller');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const RUTAS = require('@altertex/util/const/rutas');
const PERMISOS = require('@altertex/util/const/permisos');

const ruteador = express.Router();

ruteador.put(
  RUTAS.CUOTAS.ACTUALIZAR_SET_CUOTAS,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.ACTUALIZAR_SET_CUOTAS),
  controlador.actualizarSetCuotas
);

module.exports = ruteador;
