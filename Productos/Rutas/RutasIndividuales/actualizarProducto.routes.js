//RF27 Consulta Lista de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF27
const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/pro/ctrl/actualizarProductos.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');
const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

ruteador.post(
  RUTAS.PRODUCTOS.ACTUALIZAR,
  revisarApiKey,
  autorizarToken,
  limitePeticionesDiarias(PERMISOS.ACTUALIZAR_PRODUCTO),
  controlador.actualizarProducto
);

module.exports = ruteador;
