const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/rol/ctrl/eliminarRol.controller');
const PERMISOS = require('@altertex/util/const/permisos');

const RUTAS = require('@altertex/util/const/rutas');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const revisarPermisos = require('@altertex/util/inter/verificarPermisos');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');

// RF10 - Eliminar rol - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF10

/**
 * @swagger
 * /api/roles/eliminar:
 *   delete:
 *     tags:
 *       - Roles
 *     summary: Eliminar uno o varios roles
 *     description: |
 *       Elimina uno o varios roles del sistema según los IDs proporcionados.
 *       Requiere API Key, token JWT y permisos adecuados.
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idsRol:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *             required:
 *               - idsRol
 *     responses:
 *       200:
 *         description: Rol(es) eliminado(s) correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Se elimino el rol correctamente
 *       400:
 *         description: Error en la solicitud o el rol no existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Ocurrió un error al eliminar rol
 *       401:
 *         description: No autorizado - Token JWT faltante o inválido
 *       403:
 *         description: Prohibido - Permiso insuficiente
 *       500:
 *         description: Error inesperado del servidor
 */
ruteador.post(
  RUTAS.ROLES.ELIMINAR_ROL,
  revisarApiKey(),
  autorizarToken,
  limitePeticionesDiarias,
  revisarPermisos(PERMISOS.ELIMINAR_ROL),
  controlador.eliminarRol
);

module.exports = ruteador;
