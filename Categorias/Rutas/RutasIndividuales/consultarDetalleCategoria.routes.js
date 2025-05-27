/**
 * RF48 Leer categoría de productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF48
 */

const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/cat/ctrl/consultarDetalleCategoria.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

ruteador.get(
  `${RUTAS.CATEGORIAS.LEER}/:idCategoria`,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.LEER_CATEGORIA_PRODUCTOS),
  controlador.consultarDetalleCategoria
);

module.exports = ruteador;