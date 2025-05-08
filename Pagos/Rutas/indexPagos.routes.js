const express = require('express');
const ruteador = express.Router();
const RUTAS = require('@altertex/util/const/rutas');

const rutaConsultarPago = require('@altertex/pago/rutas/rutasInd/consultarTipoPago.routes');
const rutasActualizarPago = require('@altertex/pago/rutas/rutasInd/actualizarTipoPago.routes');

ruteador.use(RUTAS.PAGOS.BASE, rutaConsultarPago);
ruteador.use(RUTAS.PAGOS.BASE, rutasActualizarPago);

module.exports = ruteador;
