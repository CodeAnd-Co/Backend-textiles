// RF5 - Eliminar Usuario -  https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/rf5/

const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/usu/ctrl/eliminarUsuario.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

ruteador.post(
  RUTAS.USUARIOS.ELIMINAR_USUARIOS,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.ELIMINAR_USUARIOS),
  controlador.eliminarUsuario
);

module.exports = ruteador;
