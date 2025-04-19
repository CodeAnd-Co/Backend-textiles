const express = require("express");
const ruteador = express.Router();
const rutasCrearUsuario = require("@altertex/usu/rutasInd/crearUsuario.routes");
const rutasLeerUsuario = require("@altertex/usu/rutasInd/leerUsuario.routes");

const RUTAS = require("@altertex/util/const/rutas");

ruteador.use(RUTAS.USUARIOS.BASE, rutasCrearUsuario);
ruteador.use(RUTAS.USUARIOS.BASE, rutasLeerUsuario);

module.exports = ruteador;
