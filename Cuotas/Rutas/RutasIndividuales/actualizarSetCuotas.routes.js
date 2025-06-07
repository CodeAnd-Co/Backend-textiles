/**
 * Ruta para actualizar un set de cuotas.
 * 
 * Método: PUT  
 * Ruta: /api/cuotas/actualizar-set-cuotas (o la que defina `RUTAS.CUOTAS.ACTUALIZAR_SET_CUOTAS`)  
 * 
 * Middleware aplicados:
 * - revisión de API Key
 * - autorización por token JWT
 * - verificación de permisos de usuario
 * 
 * Permiso requerido: PERMISOS.ACTUALIZAR_SET_CUOTAS
 * 
 * @module actualizarSetCuotas.routes
 */



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
