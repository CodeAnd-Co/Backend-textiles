// RF[46] Consulta Lista de Productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF46]

const express = require('express');
const ruteador = express.Router();
const RUTAS = require('@altertex/util/const/rutas');
const controlador = require('@altertex/cat/ctrl/crearCategoria.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const verificarPermiso = require('@altertex/util/inter/verificarPermisos');
const PERMISOS = require('@altertex/util/const/permisos');

ruteador.post(
  RUTAS.CATEGORIAS.CREAR_CATEGORIA,
  validarYSanitizar,
  revisarApiKey(),
  autorizarToken,
  verificarPermiso(PERMISOS.CREAR_CATEGORIA_PRODUCTOS),
  controlador.crearCategoria
);

module.exports = ruteador;
