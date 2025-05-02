//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/prove/ctrl/crearProveedor.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

ruteador.post(
  RUTAS.PROVEEDORES.CREAR,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.CREAR_PRODUCTO),
  controlador.crearProveedor
);

module.exports = ruteador;
