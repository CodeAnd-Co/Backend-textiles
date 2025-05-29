const express = require('express');
const ruteador = express.Router();
const rutasCrearUsuario = require('@altertex/usu/rutasInd/crearUsuario.routes');
const rutasLeerUsuario = require('@altertex/usu/rutasInd/leerUsuario.routes');
const rutasConsultarListaUsuarios = require('@altertex/usu/rutasInd/consultarListaUsuarios.routes');
const rutasEliminarUsuario = require('@altertex/usu/rutasInd/eliminarUsuario.routes');
const rutasActualizarUsuario = require('@altertex/usu/rutasInd/actualizarUsuario.routes');

const RUTAS = require('@altertex/util/const/rutas');

ruteador.use(RUTAS.USUARIOS.BASE, rutasConsultarListaUsuarios);
ruteador.use(RUTAS.USUARIOS.BASE, rutasCrearUsuario);
ruteador.use(RUTAS.USUARIOS.BASE, rutasLeerUsuario);
ruteador.use(RUTAS.USUARIOS.BASE, rutasEliminarUsuario);

module.exports = ruteador;
