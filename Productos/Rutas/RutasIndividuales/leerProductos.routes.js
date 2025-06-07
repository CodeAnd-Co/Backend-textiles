const express = require('express');
const ruteador = express.Router();
const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const controlador = require('@altertex/pro/ctrl/leerProducto.controller');
// RF[28] Leer producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF28]

ruteador.get(RUTAS.PRODUCTOS.LEER, revisarApiKey(), autorizarToken, verificarPermisos(PERMISOS.LEER_PRODUCTO), validarYSanitizar, controlador.leerProducto);

module.exports = ruteador;