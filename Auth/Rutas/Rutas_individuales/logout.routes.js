const express = require("express");
const revisarApiKey = require("../../../util/middlewares/revisarApiKey");
const ruteador = express.Router();
const controlador = require("../../Controladores/logout.controller");

ruteador.post("/logout", revisarApiKey("x-api-key"), controlador.logout);

module.exports = ruteador;
