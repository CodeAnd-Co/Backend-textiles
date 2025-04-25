//RF[50] Elimina categoría de productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF50]

const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/cat/ctrl/eliminarCategoria.controller");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");
const autorizarToken = require("@altertex/util/inter/autorizarToken");
const verificarPermisos = require("@altertex/util/inter/verificarPermisos");

const PERMISOS = require("@altertex/util/const/permisos");
const RUTAS = require("@altertex/util/const/rutas");

ruteador.post(
  RUTAS.CATEGORIAS.ELIMINAR_CATEGORIA,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.ELIMINAR_CATEGORIA_PRODUCTOS),
  controlador.eliminarCategoria
);

module.exports = ruteador;
