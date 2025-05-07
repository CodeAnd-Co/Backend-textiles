const express = require('express');
const ruteador = express.Router();
const RUTAS = require('@altertex/util/const/rutas');

const rutaConsultarPago = require('@altertex/pago/rutas/rutasInd/consultarTipoPago.routes');

ruteador.use(RUTAS.PAGOS.BASE, rutaConsultarPago);

module.exports = ruteador;
