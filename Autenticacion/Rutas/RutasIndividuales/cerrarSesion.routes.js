const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/Autenticacion/Controladores/cerrarSesion.controller");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");

const RUTAS = require("@altertex/util/const/rutas");

ruteador.post(
  RUTAS.AUTENTICACION.CERRAR_SESION,
  revisarApiKey(),
  controlador.cerrarSesion
);

module.exports = ruteador;
