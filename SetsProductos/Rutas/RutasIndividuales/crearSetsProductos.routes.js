const express = require('express');
const ruteador = express.Router();
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');

const controlador = require('@altertex/setspro/ctrl/crearSetsProductos.controller');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

ruteador.post(RUTAS.SETS_PRODUCTOS.CREAR, validarYSanitizar, revisarApiKey(), autorizarToken, limitePeticionesDiarias, verificarPermisos(PERMISOS.CREAR_SET_PRODUCTOS), controlador.crearSetsProductos);

module.exports = ruteador;