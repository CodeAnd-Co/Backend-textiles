const express = require('express');
const ruteador = express.Router();

const rutaConsultar = require('@altertex/pro/rutasInd/consultarProductos.routes');
const rutaEliminar = require("@altertex/pro/rutasInd/eliminarProducto.routes");

const RUTAS = require('@altertex/util/const/rutas');

// RF[27] Consulta Lista de Productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF27]
// RF[30] Eliminar Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF30]    
ruteador.use(RUTAS.PRODUCTOS.BASE, rutaConsultar, rutaEliminar);

module.exports = ruteador;