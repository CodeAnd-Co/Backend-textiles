const express = require('express');
const ruteador = express.Router();
const rutasObtenerPedidos = require('@altertex/pedidos/rutasInd/obtenerPedidos.routes');
const rutasEliminarPedido = require('@altertex/pedidos/rutasInd/eliminarPedidos.routes');
const RUTAS = require('@altertex/util/const/rutas');

ruteador.use(RUTAS.PEDIDOS.BASE, rutasObtenerPedidos);

module.exports = ruteador;
