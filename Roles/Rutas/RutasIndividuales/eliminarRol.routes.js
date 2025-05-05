const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/rol/ctrl/eliminarRol.controller');

const RUTAS = require('@altertex/util/const/rutas');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');

ruteador.post(RUTAS.ROLES.ELIMINAR_ROL, revisarApiKey(), autorizarToken, controlador.eliminarRol);

module.exports = ruteador;
