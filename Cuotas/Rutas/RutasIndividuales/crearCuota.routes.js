const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/cuota/ctrl/crearCuota.controller");

const RUTAS = require("@altertex/util/const/rutas");
const validarYSanitizar = require("@altertex/util/inter/validarYSanitizar");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");

ruteador.post(
  RUTAS.CUOTAS.AGREGAR,
  validarYSanitizar,
  revisarApiKey(),
  controlador.crearCuota
);

module.exports = ruteador;
