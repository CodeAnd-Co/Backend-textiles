const express = require('express');
const ruteador = express.Router();
const RUTAS = require('@altertex/util/const/rutas');
const PERMISOS = require('@altertex/util/const/permisos');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const controlador = require('@altertex/emp/ctrl/actualizarGrupoEmpleado.controller');

ruteador.put(
  RUTAS.EMPLEADOS.ACTUALIZAR_GRUPO_EMPLEADO,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.ACTUALIZAR_GRUPO_EMPLEADOS),
  validarYSanitizar,
  controlador.actualizarGrupoEmpleados
);

module.exports = ruteador;
