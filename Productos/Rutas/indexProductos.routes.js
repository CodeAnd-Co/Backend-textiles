const express = require('express');
const ruteador = express.Router();
const rutaConsultar = require('@altertex/pro/rutasInd/consultarProductos.routes');
const rutaCrearCategoria = require('@altertex/pro/rutasInd/crearCategoria.routes');

const RUTAS = require('@altertex/util/const/rutas');

ruteador.use(RUTAS.PRODUCTOS.BASE, rutaConsultar);
ruteador.use(RUTAS.PRODUCTOS.BASE, rutaCrearCategoria);

module.exports = ruteador;
