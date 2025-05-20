//RF02 Super Administrador Consulta Lista de Usuarios - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF2

const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/usu/ctrl/consultarListaUsuarios.controller");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");
const autorizarToken = require("@altertex/util/inter/autorizarToken");
const verificarPermisos = require("@altertex/util/inter/verificarPermisos");
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');


const PERMISOS = require("@altertex/util/const/permisos");
const RUTAS = require("@altertex/util/const/rutas");

ruteador.post(
  RUTAS.USUARIOS.CONSULTAR_LISTA_USUARIOS,
  revisarApiKey(),
  autorizarToken,
  limitePeticionesDiarias,
  verificarPermisos(PERMISOS.CONSULTAR_USUARIOS),
  controlador.consultarListaUsuarios
);

module.exports = ruteador;
