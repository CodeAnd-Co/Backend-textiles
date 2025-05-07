const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/pago/ctrl/consultarTipoPago.controller');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const revisarPermisos = require('@altertex/util/inter/verificarPermisos');

ruteador.get(
  RUTAS.PAGOS.CONSULTAR_LISTA,
  revisarApiKey(),
  autorizarToken,
  revisarPermisos(PERMISOS.CONSULTAR_TIPOS_PAGO),
  controlador.consultarTipoPago
);

module.exports = ruteador;
