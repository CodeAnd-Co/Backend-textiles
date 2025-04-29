const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/rol/ctrl/obtenerOpcionesRol.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const RUTAS = require('@altertex/util/const/rutas');

ruteador.post(
  '/obtener-opciones',
  revisarApiKey(),
  controlador.obtenerOpcionesRol
);

module.exports = ruteador;
