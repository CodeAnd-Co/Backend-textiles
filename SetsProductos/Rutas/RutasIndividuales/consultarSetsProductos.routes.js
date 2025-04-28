const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/setspro/ctrl/consultarSetsProductos.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * RF42 - Super Administrador, Cliente Consulta Lista de Sets de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF42
 */

/**
 * @swagger
 * AGREGAR COMENTARIOS SWAGGER
 */

ruteador.post(
  RUTAS.SETS_PRODUCTOS.CONSULTAR_LISTA,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.CONSULTAR_SETS_PRODUCTOS),
  controlador.consultarLista
);

module.exports = ruteador;
