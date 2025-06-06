const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/rol/ctrl/actualizarRol.controller');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');
const revisarPermisos = require('@altertex/util/inter/verificarPermisos');

ruteador.put(RUTAS.ROLES.ACTUALIZAR, validarYSanitizar, revisarApiKey(), autorizarToken, limitePeticionesDiarias, revisarPermisos(PERMISOS.ACTUALIZAR_ROL), controlador.actualizarRol);

module.exports = ruteador;