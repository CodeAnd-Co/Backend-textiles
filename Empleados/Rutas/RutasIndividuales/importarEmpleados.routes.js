//RF57 - Importar Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF57

const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/emp/ctrl/importarEmpleados.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

//SWAGGER

ruteador.post(
  RUTAS.EMPLEADOS.IMPORTAR_EMPLEADOS,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.IMPORTAR_EMPLEADOS),
  controlador.importarEmpleados
);

module.exports = ruteador;