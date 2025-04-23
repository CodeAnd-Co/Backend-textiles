const express = require("express");
const ruteador = express.Router();
const rutasConsultarListaGrupos = require("@altertex/emp/rutasInd/consultarListaGrupos.routes");

const RUTAS = require("@altertex/util/const/rutas");

//RF22 - Consulta Lista de Grupo Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF22
ruteador.use(RUTAS.EMPLEADOS.BASE, rutasConsultarListaGrupos);

module.exports = ruteador;
