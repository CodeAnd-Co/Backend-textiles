// Importación del framework Express para crear rutas
const express = require("express");

// Se crea una nueva instancia del enrutador de Express
const ruteador = express.Router();

// Importación del controlador que maneja la lógica de la lista de roles
const controlador = require("@altertex/rol/ctrl/consultarLista.controller");

// Importación de middlewares que validan la API key, el token JWT y los permisos del usuario
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");
const autorizarToken = require("@altertex/util/inter/autorizarToken");
const verificarPermisos = require("@altertex/util/inter/verificarPermisos");

// Importación de constantes de permisos y rutas
const PERMISOS = require("@altertex/util/const/permisos");
const RUTAS = require("@altertex/util/const/rutas");

// Definición de la ruta POST para consultar la lista de roles
// Esta ruta requiere una API Key, un token válido y el permiso específico para consultar roles
ruteador.post(
  RUTAS.ROLES.CONSULTAR_LISTA,              // Ruta relativa para consultar roles
  revisarApiKey(),                          // Middleware que valida la API Key
  autorizarToken,                           // Middleware que valida el token JWT
  verificarPermisos(PERMISOS.CONSULTAR_ROLES), // Middleware que verifica el permiso requerido
  controlador.consultarLista                // Controlador que maneja la solicitud
);

// Exporta el enrutador para ser utilizado en el módulo principal de rutas
module.exports = ruteador;