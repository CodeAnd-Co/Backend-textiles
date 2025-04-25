const express = require("express");
const ruteador = express.Router();
const rutasConsultarListaEventos = require("@altertex/eve/rutasInd/consultarListaEventos.routes");
const rutasEliminarEvento = require("@altertex/eve/rutasInd/eliminarEvento.routes");

/**
 * @module Eventos/Rutas
 * @description Gestor de rutas para el módulo de eventos
 */

const RUTAS = require("@altertex/util/const/rutas");

// Configuración de las rutas específicas para eventos
ruteador.use(RUTAS.EVENTOS.BASE, rutasConsultarListaEventos);
ruteador.use(RUTAS.EVENTOS.BASE, rutasEliminarEvento);

module.exports = ruteador;
