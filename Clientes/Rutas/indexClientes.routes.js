const express = require("express");
const ruteador = express.Router();
const rutasConsultarSistema = require("@altertex/cli/rutasInd/consultarSistema.routes");
const rutasConsultarClientes = require("@altertex/cli/rutasInd/consultarClientes.routes");

const rutasLeerCliente = require("@altertex/cli/rutasInd/leerCliente.routes");

const RUTAS = require("@altertex/util/const/rutas");

ruteador.use(RUTAS.CLIENTES.BASE, rutasConsultarSistema);
//RF12 - Consulta Lista de Clientes - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF12
ruteador.use(RUTAS.CLIENTES.BASE, rutasConsultarClientes);


//RF13 - Consulta Cliente - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/rf13/
ruteador.use(RUTAS.CLIENTES.BASE, rutasLeerCliente);

module.exports = ruteador;
