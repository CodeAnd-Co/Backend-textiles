const express = require('express');
const ruteador = express.Router();

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');
const controlador = require('@altertex/pago/ctrl/actualizarTipoPago.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const revisarPermisos = require('@altertex/util/inter/verificarPermisos');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');

//RF[52] Consulta Lista de Pago - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF52]

ruteador.put(
  RUTAS.PAGOS.ACTUALIZAR,
  revisarApiKey(),
  validarYSanitizar(),
  autorizarToken,
  revisarPermisos(PERMISOS.ACTUALIZAR_TIPO_PAGO),
  controlador.actualizarTipoPago
);

module.exports = ruteador;
