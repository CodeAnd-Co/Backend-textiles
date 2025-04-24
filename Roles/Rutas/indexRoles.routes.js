/**
 * @file indexRoles.routes.js
 * @description Encargado de centralizar y registrar las rutas relacionadas con la entidad "Rol".
 * Utiliza las rutas individuales definidas en el archivo correspondiente y las monta bajo un prefijo base.
 */

// Importación del framework Express para la creación de rutas
const express = require("express");

// Creación de un enrutador utilizando Express
const ruteador = express.Router();

// Importación de las rutas individuales para consultar la lista de roles
const rutasConsultarLista = require("@altertex/rol/rutasInd/consultarLista.routes");

// Importación de las rutas base definidas en el archivo de constantes
const RUTAS = require("@altertex/util/const/rutas");

/**
 * Montaje de las rutas individuales bajo el prefijo base definido para roles.
 * Ejemplo: /api/roles/consultar-lista
 */
ruteador.use(RUTAS.ROLES.BASE, rutasConsultarLista);

// Exportación del enrutador para que sea utilizado en el archivo principal de rutas (app.js)
module.exports = ruteador;