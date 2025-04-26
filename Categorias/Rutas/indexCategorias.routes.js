const express = require('express');
const ruteador = express.Router();
const rutasConsultarListaCategorias = require('@altertex/cat/rutasInd/consultarListaCategorias.routes');
const rutasCrearCategoria = require('@altertex/cat/rutasInd/crearCategoria.routes');

const RUTAS = require('@altertex/util/const/rutas');

ruteador.use(RUTAS.CATEGORIAS.BASE, rutasConsultarListaCategorias);
ruteador.use(RUTAS.CATEGORIAS.BASE, rutasCrearCategoria);

module.exports = ruteador;
