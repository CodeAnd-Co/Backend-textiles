const express = require('express');
const ruteador = express.Router();

const controlador = require('@altertex/rol/ctrl/consultarDetalleRol.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * RF## - Leer detalle de un rol - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF##
 */

/**
 * @swagger
 * /api/roles/leer:
 *   get:
 *     summary: Obtener detalle de un rol
 *     description: Devuelve nombre, descripción, cantidad de usuarios y permisos de un rol específico.
 *     tags: [Roles]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: idRol
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol a consultar.
 *     responses:
 *       200:
 *         description: Detalle del rol obtenido exitosamente.
 *       400:
 *         description: Parámetros inválidos.
 *       404:
 *         description: Rol no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
ruteador.get(
  RUTAS.ROLES.LEER_ROL,
  validarYSanitizar,
  revisarApiKey(),
  autorizarToken,
  limitePeticionesDiarias,
  verificarPermisos(PERMISOS.LEER_ROL),
  controlador.consultarDetalle
);

module.exports = ruteador;