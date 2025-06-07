const express = require('express');
const ruteador = express.Router();
const rutaCrearCuota = require('@altertex/cuota/rutasInd/crearCuota.routes');
const rutaObtenerOpcionesCuota = require('@altertex/cuota/rutasInd/obtenerOpcionesCuotas.routes');
const rutasConsultarListaCuotas = require('@altertex/cuota/rutasInd/consultarCuotas.routes');
const rutaEliminarSetCuotas = require('@altertex/cuota/rutasInd/eliminarSetCuotas.routes');
const rutaLeerCuota = require('@altertex/cuota/rutasInd/leerSetCuotas.routes');
const rutaActualizarSetCuotas = require('@altertex/cuota/rutasInd/actualizarSetCuotas.routes');


const RUTAS = require('@altertex/util/const/rutas');

ruteador.use(RUTAS.CUOTAS.BASE, rutaCrearCuota);
ruteador.use(RUTAS.CUOTAS.BASE, rutaObtenerOpcionesCuota);
ruteador.use(RUTAS.CUOTAS.BASE, rutasConsultarListaCuotas);
ruteador.use(RUTAS.CUOTAS.BASE, rutaEliminarSetCuotas);
ruteador.use(RUTAS.CUOTAS.BASE, rutaLeerCuota);
ruteador.use(RUTAS.CUOTAS.BASE, rutaActualizarSetCuotas);


module.exports = ruteador;
