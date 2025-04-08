const express = require("express");
const revisarApiKey = require("../../../util/middlewares/revisarApiKey");
const ruteador = express.Router();
const controlador = require("../../Controladores/inicioSesion.controller");
const validarNoSql = require("../../../util/middlewares/validarInjeccionNoSql");

ruteador.post(
  "/auth/login",
  validarNoSql,
  revisarApiKey("x-api-key"),
  controlador.inicioSesion
);

module.exports = ruteador;
