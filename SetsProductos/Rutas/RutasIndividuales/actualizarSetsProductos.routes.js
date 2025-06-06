const express = require('express');
const ruteador = express.Router();

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');
const controlador = require('@altertex/setspro/ctrl/actualizarSetsProductos.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const revisarPermisos = require('@altertex/util/inter/verificarPermisos');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');

//RF[19] Actualizar Empleado - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF19]

/**
 * @swagger...
 */

ruteador.put(
  RUTAS.SETS_PRODUCTOS.ACTUALIZAR,
  revisarApiKey(),
  validarYSanitizar,
  autorizarToken,
  limitePeticionesDiarias,
  revisarPermisos(PERMISOS.ACTUALIZAR_SET_PRODUCTOS),
  controlador.actualizarSetProductos
);

module.exports = ruteador;
