const express = require('express');
const ruteador = express.Router();
const rutaConsultarLista = require('@altertex/pro/rutasInd/consultarProductos.routes');
const rutaEliminar = require('@altertex/pro/rutasInd/eliminarProducto.routes');
const rutaCrearProducto = require('@altertex/pro/rutasInd/crearProducto.routes');
const rutasLeerProducto = require('@altertex/pro/rutasInd/leerProductos.routes');

const RUTAS = require('@altertex/util/const/rutas');

//RF27 Consulta Lista de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF27
ruteador.use(RUTAS.PRODUCTOS.BASE, rutaConsultarLista);
//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
ruteador.use(RUTAS.PRODUCTOS.BASE, rutaCrearProducto);
// RF[30] Eliminar Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF30]
ruteador.use(RUTAS.PRODUCTOS.BASE, rutaEliminar);
// RF[28] Leer producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF28]
ruteador.use(RUTAS.PRODUCTOS.BASE, rutasLeerProducto);

module.exports = ruteador;