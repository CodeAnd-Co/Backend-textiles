const express = require('express');
const ruteador = express.Router();
const rutasObtenerPedidos = require('@altertex/pedidos/rutasInd/obtenerPedidos.routes');
const rutasEliminarPedido = require('@altertex/pedidos/rutasInd/eliminarPedidos.routes');
const rutasActualizarPedidos = require('@altertex/pedidos/rutasInd/actualizarPedidos.routes');
const RUTAS = require('@altertex/util/const/rutas');

ruteador.use(RUTAS.PEDIDOS.BASE, rutasObtenerPedidos);
ruteador.use(RUTAS.PEDIDOS.BASE, rutasEliminarPedido);
ruteador.use(RUTAS.PEDIDOS.BASE, rutasActualizarPedidos);


module.exports = ruteador;
