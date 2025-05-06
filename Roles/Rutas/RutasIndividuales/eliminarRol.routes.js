const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/rol/ctrl/eliminarRol.controller');
const PERMISOS = require('@altertex/util/const/permisos');

const RUTAS = require('@altertex/util/const/rutas');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const revisarPermisos = require('@altertex/util/inter/verificarPermisos');

ruteador.post(
  RUTAS.ROLES.ELIMINAR_ROL,
  revisarApiKey(),
  autorizarToken,
  revisarPermisos(PERMISOS.ELIMINAR_ROL),
  controlador.eliminarRol
);

module.exports = ruteador;
