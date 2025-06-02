const express = require('express');
const ruteador = express.Router();
const rutasConsultarListaCategorias = require('@altertex/cat/rutasInd/consultarListaCategorias.routes');
const rutasCrearCategoria = require('@altertex/cat/rutasInd/crearCategoria.routes');
const rutasEliminarCategoria = require('@altertex/cat/rutasInd/eliminarCategoria.routes');
const rutasLeerCategoria = require('@altertex/cat/rutasInd/consultarDetalleCategoria.routes');

const RUTAS = require('@altertex/util/const/rutas');

ruteador.use(RUTAS.CATEGORIAS.BASE, rutasConsultarListaCategorias);
ruteador.use(RUTAS.CATEGORIAS.BASE, rutasCrearCategoria);
ruteador.use(RUTAS.CATEGORIAS.BASE, rutasEliminarCategoria);
ruteador.use(RUTAS.CATEGORIAS.BASE, rutasLeerCategoria);

module.exports = ruteador;
