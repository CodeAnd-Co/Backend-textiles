const express = require("express");
const ruteador = express.Router();
const rutasConsultarLista = require("@altertex/emp/rutasInd/consultarLista.routes");

const RUTAS = require("@altertex/util/const/rutas");

//RF17 - Consulta Lista de Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF17
ruteador.use(RUTAS.EMPLEADOS.BASE, rutasConsultarLista);

module.exports = ruteador;
