const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/rol/ctrl/crearRol.controller");

const RUTAS = require("@altertex/util/const/rutas");
const validarYSanitizar = require("@altertex/util/inter/validarYSanitizar");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");
const autorizarToken = require("@altertex/util/inter/autorizarToken");

ruteador.post(
    RUTAS.ROLES.CREAR_ROL,
    validarYSanitizar,
    revisarApiKey(),
    autorizarToken,
    controlador.crearRol
);

module.exports = ruteador;

