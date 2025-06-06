const express = require('express');
const ruteador = express.Router();

const controlador = require('@altertex/pedidos/ctrl/actualizarPedido.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const limitePeticiones = require('@altertex/util/inter/limitePeticiones');
const RUTAS = require('@altertex/util/const/rutas');
const PERMISOS = require('@altertex/util/const/permisos');

// RF[62] - Actualizar Pedido
ruteador.put(
  RUTAS.PEDIDOS.ACTUALIZAR_PEDIDO,
  revisarApiKey(),
  autorizarToken,
  limitePeticiones,
  verificarPermisos(PERMISOS.ACTUALIZAR_PEDIDO),
  controlador.actualizarPedido
);

module.exports = ruteador;
