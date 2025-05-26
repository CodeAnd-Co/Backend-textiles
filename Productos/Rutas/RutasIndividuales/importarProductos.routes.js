//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/pro/ctrl/importarProductos.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');


const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * @swagger
**/

ruteador.post(
  RUTAS.PRODUCTOS.IMPORTAR,
  revisarApiKey(),
  autorizarToken,
  limitePeticionesDiarias,
  verificarPermisos(PERMISOS.IMPORTAR_PRODUCTOS),
  controlador.importarProductos
);

module.exports = ruteador;
