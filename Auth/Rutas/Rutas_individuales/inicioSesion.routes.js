const express = require("express");
const revisarApiKey = require("../../../util/middlewares/revisarApiKey");
const ruteador = express.Router();
const controlador = require("../../Controladores/inicioSesion.controller");

ruteador.post("/login", revisarApiKey("x-api-key"), controlador.inicioSesion);
