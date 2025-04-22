const express = require("express");
const ruteador = express.Router();
const rutasCrearUsuario = require("@altertex/usu/rutasInd/crearUsuario.routes");

const RUTAS = require("@altertex/util/const/rutas");

ruteador.use(RUTAS.USUARIOS.BASE, rutasCrearUsuario);

module.exports = ruteador;
