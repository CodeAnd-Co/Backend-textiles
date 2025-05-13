const express = require('express');
const ruteador = express.Router();
const rutasConsultarSistema = require("@altertex/cli/rutasInd/consultarSistema.routes");
const rutasConsultarClientes = require("@altertex/cli/rutasInd/consultarClientes.routes");
const rutasEliminarCliente = require("@altertex/cli/rutasInd/eliminarCliente.routes");
const rutasCrearCliente = require("@altertex/cli/rutasInd/crearCliente.routes");
const rutasConsultarSistema = require('@altertex/cli/rutasInd/consultarSistema.routes');
const rutasConsultarClientes = require('@altertex/cli/rutasInd/consultarClientes.routes');
const rutasEliminarCliente = require('@altertex/cli/rutasInd/eliminarCliente.routes');
const rutasActualizarCliente = require('@altertex/cli/rutasInd/actualizarClientes.routes');
const rutasLeerCliente = require('@altertex/cli/rutasInd/leerCliente.routes');

const RUTAS = require('@altertex/util/const/rutas');

ruteador.use(RUTAS.CLIENTES.BASE, rutasConsultarSistema);
//RF12 - Consulta Lista de Clientes - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF12
ruteador.use(RUTAS.CLIENTES.BASE, rutasConsultarClientes);
//RF15 - Elimina Cliente - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF15
ruteador.use(RUTAS.CLIENTES.BASE, rutasEliminarCliente);

//RF13 - Consulta Cliente - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/rf13/
ruteador.use(RUTAS.CLIENTES.BASE, rutasLeerCliente);
//RF11 - Crear Cliente - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF11
ruteador.use(RUTAS.CLIENTES.BASE, rutasCrearCliente);

ruteador.use(RUTAS.CLIENTES.BASE, rutasActualizarCliente);
module.exports = ruteador;
