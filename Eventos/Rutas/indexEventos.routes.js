const express = require("express");
const ruteador = express.Router();
const rutasConsultarListaEventos = require("@altertex/eve/rutasInd/consultarListaEventos.routes");

/**
 * @module Eventos/Rutas
 * @description Gestor de rutas para el módulo de eventos
 */

const RUTAS = require("@altertex/util/const/rutas");

// Configuración de las rutas específicas para eventos
ruteador.use(RUTAS.EVENTOS.BASE, rutasConsultarListaEventos);

module.exports = ruteador;
