const express = require("express");
const ruteador = express.Router();
const rutasAutenticacionSesion = require("@altertex/aut/rutasInd/autenticacionSesion.routes");
const rutasInicioSesion = require("@altertex/aut/rutasInd/inicioSesion.routes");
const rutasCerrarSesion = require("@altertex/aut/rutasInd/cerrarSesion.routes");
const rutasVerificar2FA = require('@altertex/aut/rutasInd/verificar2FA.routes');
const rutasActivar2FA = require('@altertex/aut/rutasInd/activar2FA.routes');

const RUTAS = require("@altertex/util/const/rutas");

ruteador.use(RUTAS.AUTENTICACION.BASE, rutasAutenticacionSesion);

//RF78 - Iniciar Sesion - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF78
ruteador.use(RUTAS.AUTENTICACION.BASE, rutasInicioSesion);
ruteador.use(RUTAS.AUTENTICACION.BASE, rutasCerrarSesion);
ruteador.use(RUTAS.AUTENTICACION.BASE, rutasVerificar2FA);
ruteador.use(RUTAS.AUTENTICACION.BASE, rutasActivar2FA);

module.exports = ruteador;
