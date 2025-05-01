const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/rol/ctrl/obtenerOpcionesRol.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');

/**
 * @file obtenerOpcionesRol.routes.js
 * @description Define la ruta para obtener las opciones de permisos disponibles al crear o editar un rol.
 *
 * Esta ruta aplica la verificación de API Key como medida de seguridad antes de ejecutar el controlador.
 */

/**
 * POST /obtener-opciones
 *
 * Obtiene los permisos disponibles para ser asignados a un rol. 
 * - Protegida con middleware que verifica que se incluya una API Key válida.
 *
 * @route {POST} /api/roles/obtener-opciones
 * @middleware revisarApiKey
 * @controller obtenerOpcionesRol
 */
ruteador.post(
  '/obtener-opciones',
  revisarApiKey(),
  controlador.obtenerOpcionesRol
);

module.exports = ruteador;
