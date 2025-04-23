//RF[47] Consulta lista de categorías - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF47]

const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/cat/ctrl/consultarListaCategorias.controller");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");
const autorizarToken = require("@altertex/util/inter/autorizarToken");
const verificarPermisos = require("@altertex/util/inter/verificarPermisos");

const PERMISOS = require("@altertex/util/const/permisos");
const RUTAS = require("@altertex/util/const/rutas");

ruteador.post(
  RUTAS.CATEGORIAS.CONSULTAR_LISTA_CATEGORIAS,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.CONSULTAR_CATEGORIAS_PRODUCTOS),
  controlador.consultarListaCategorias
);

module.exports = ruteador;