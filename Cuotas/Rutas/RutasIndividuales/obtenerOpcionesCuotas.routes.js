const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/cuota/ctrl/obtenerOpcionesCuotas.controller");
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');


const RUTAS = require("@altertex/util/const/rutas");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");

ruteador.post(
  RUTAS.CUOTAS.OPCIONES,
  limitePeticionesDiarias,
  revisarApiKey(),
  controlador.obtenerOpcionesCuotas
);

module.exports = ruteador;
