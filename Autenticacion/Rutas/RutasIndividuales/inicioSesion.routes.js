const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/aut/ctrl/inicioSesion.controller");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");

const RUTAS = require("@altertex/util/const/rutas");

ruteador.post(
  RUTAS.AUTENTICACION.INICIO_SESION,
  revisarApiKey(),
  controlador.inicioSesion
);

module.exports = ruteador;
