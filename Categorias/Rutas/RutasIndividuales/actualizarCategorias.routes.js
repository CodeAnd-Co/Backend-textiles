/**
 * RF49 - Actualizar categoría de productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF49
 */

const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/cat/ctrl/actualizarCategoria.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

ruteador.put(
  `${RUTAS.CATEGORIAS.ACTUALIZAR}/:idCategoria`,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.ACTUALIZAR_CATEGORIA_PRODUCTOS),
  controlador.actualizarCategoria
);

module.exports = ruteador;