const express = require('express');
const ruteador = express.Router();
const rutasConsultarSetsProductos = require('@altertex/setspro/rutasInd/consultarSetsProductos.routes');
const rutasEliminarSetsProductos = require('@altertex/setspro/rutasInd/eliminarSetsProductos.routes');
const rutasCrearSetsProductos = require('@altertex/setspro/rutasInd/crearSetsProductos.routes');

const RUTAS = require('@altertex/util/const/rutas');

//RF42 - Super Administrador, Cliente Consulta Lista de Sets de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF42
ruteador.use(RUTAS.SETS_PRODUCTOS.BASE, rutasConsultarSetsProductos);

//RF[45] Elimina set de productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF45]
ruteador.use(RUTAS.SETS_PRODUCTOS.BASE, rutasEliminarSetsProductos);

ruteador.use(RUTAS.SETS_PRODUCTOS.BASE, rutasCrearSetsProductos);

module.exports = ruteador;
