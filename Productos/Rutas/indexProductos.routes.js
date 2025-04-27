const express = require('express');
const ruteador = express.Router();
const rutaConsultarLista = require('@altertex/pro/rutasInd/consultarProductos.routes');
const rutaCrearProducto = require('@altertex/pro/rutasInd/crearProducto.routes');
const rutaSubirImagenes = require('@altertex/pro/rutasInd/subirImagenes.routes');

const RUTAS = require('@altertex/util/const/rutas');

//RF27 Consulta Lista de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF27
ruteador.use(RUTAS.PRODUCTOS.BASE, rutaConsultarLista);
//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
ruteador.use(RUTAS.PRODUCTOS.BASE, rutaCrearProducto);
ruteador.use(RUTAS.PRODUCTOS.BASE, rutaSubirImagenes);

module.exports = ruteador;
