const express = require('express');
const ruteador = express.Router();
const multer = require('multer');
const RUTAS = require('@altertex/util/const/rutas');
const PERMISOS = require('@altertex/util/const/permisos');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const controlador = require('@altertex/cli/ctrl/actualizarClientes.controller');

const storage = multer.memoryStorage();
const upload = multer({ storage });
ruteador.put(
  RUTAS.CLIENTES.ACTUALIZAR,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.ACTUALIZAR_CLIENTE),
  validarYSanitizar,
  upload.single('imagen'),
  controlador.actualizarClientes
);

module.exports = ruteador;
