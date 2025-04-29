const express = require('express');
const ruteador = express.Router();
const rutasConsultarSetsProductos = require('@altertex/setspro/rutasInd/consultarSetsProductos.routes');

const RUTAS = require('@altertex/util/const/rutas');

//RF42 - Super Administrador, Cliente Consulta Lista de Sets de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF42
ruteador.use(RUTAS.SETS_PRODUCTOS.BASE, rutasConsultarSetsProductos);

module.exports = ruteador;
