const express = require('express');
const ruteador = express.Router();
// const rutasCrearEvento = require('@altertex/cli/rutasInd/crearEvento.routes');
const rutasLeerEvento = require('@altertex/cli/rutasInd/leerEvento.routes');
// const rutasConsultarListaEventos = require('@altertex/cli/rutasInd/consultarListaEventos.routes');
// const rutasEliminarEvento = require('@altertex/cli/rutasInd/eliminarEvento.routes');

const RUTAS = require('@altertex/util/const/rutas');

//ruteador.use(RUTAS.EVENTOS.BASE, rutasConsultarListaEventos);
//ruteador.use(RUTAS.EVENTOS.BASE, rutasCrearEvento);
ruteador.use(RUTAS.EVENTOS.BASE, rutasLeerEvento);
//ruteador.use(RUTAS.EVENTOS.BASE, rutasEliminarEvento);

module.exports = ruteador;
