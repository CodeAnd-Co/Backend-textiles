const express = require('express');
const ruteador = express.Router();
const rutaConsultarLista = require('@altertex/prove/rutasInd/consultarProveedores.routes');
const rutaCrearProveedor = require('@altertex/prove/rutasInd/crearProveedor.routes');

const RUTAS = require('@altertex/util/const/rutas');

//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
ruteador.use(RUTAS.PROVEEDORES.BASE, rutaConsultarLista);
//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
ruteador.use(RUTAS.PROVEEDORES.BASE, rutaCrearProveedor);

module.exports = ruteador;
