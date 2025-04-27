const express = require('express');
const ruteador = express.Router();
const rutasConsultarListaGrupos = require('@altertex/emp/rutasInd/consultarListaGrupos.routes');
const rutasConsultarLista = require('@altertex/emp/rutasInd/consultarLista.routes');

const RUTAS = require('@altertex/util/const/rutas');

//RF22 - Consulta Lista de Grupo Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF22
ruteador.use(RUTAS.EMPLEADOS.BASE, rutasConsultarListaGrupos);
//RF17 - Consulta Lista Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF17
ruteador.use(RUTAS.EMPLEADOS.BASE, rutasConsultarLista);

module.exports = ruteador;
