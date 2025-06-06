/**
 * @file indexRoles.routes.js
 * @description
 * Encargado de centralizar y registrar todas las rutas relacionadas con la entidad "Rol".
 * Este archivo importa las rutas individuales (por funcionalidad) y las monta bajo un prefijo base común,
 * facilitando así la organización modular de las rutas dentro del sistema.
 */

// Importación del framework Express para la gestión de rutas HTTP.
const express = require('express');

// Se crea una nueva instancia del enrutador de Express para agrupar rutas del módulo de roles.
const ruteador = express.Router();

// Importación del archivo que contiene las rutas individuales para consultar la lista de roles.
const rutasConsultarLista = require('@altertex/rol/rutasInd/consultarLista.routes');

const rutasCrearRol = require('@altertex/rol/rutasInd/crearRol.routes');

const rutasObtenerOpcionesRol = require('@altertex/rol/rutasInd/obtenerOpcionesRol.routes');

const rutasEliminarRol = require('@altertex/rol/rutasInd/eliminarRol.routes');

const rutasConsultarDetalle = require('@altertex/rol/rutasInd/consultarDetalleRol.routes');

const rutasActualizarRol = require('@altertex/rol/rutasInd/actualizarRol.routes');

// Importación del archivo de constantes donde están definidas las rutas base del sistema.
const RUTAS = require('@altertex/util/const/rutas');

/**
 * Se monta el grupo de rutas relacionadas con roles bajo el prefijo definido.
 * Por convención, este prefijo suele ser: /api/roles
 *
 * Ejemplo final de ruta expuesta:
 * POST /api/roles/consultar-lista
 */
ruteador.use(RUTAS.ROLES.BASE, rutasConsultarLista);

ruteador.use(RUTAS.ROLES.BASE, rutasCrearRol);

ruteador.use(RUTAS.ROLES.BASE, rutasObtenerOpcionesRol);

ruteador.use(RUTAS.ROLES.BASE, rutasEliminarRol);

ruteador.use(RUTAS.ROLES.BASE, rutasConsultarDetalle);

ruteador.use(RUTAS.ROLES.BASE, rutasActualizarRol);

// Exporta el enrutador para ser utilizado en el archivo principal de rutas de la aplicación (por ejemplo: app.js).
module.exports = ruteador;