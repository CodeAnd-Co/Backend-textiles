// RF5 - Eliminar Usuario -  https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/rf5/

const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/usu/ctrl/eliminarUsuario.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * @swagger
 * /api/usuarios/eliminar-usuarios:
 *   delete:
 *     summary: Eliminar usuarios
 *     description: Elimina uno o varios usuarios de la base de datos. Requiere autenticación y permisos específicos.
 *     tags:
 *       - Usuarios
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
 *               ids:
 *                 oneOf:
 *                   - type: integer
 *                     example: 93
 *                   - type: array
 *                     items:
 *                       type: integer
 *                     example: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Usuarios eliminados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Usuarios eliminados correctamente.
 *       404:
 *         description: Usuarios no encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *               example:
 *                 mensaje: No se encontraron los usuarios especificados.
 *       500:
 *         description: Error interno al eliminar los usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *               example:
 *                 mensaje: Error al eliminar los usuarios.
 */

ruteador.post(
  RUTAS.USUARIOS.ELIMINAR_USUARIOS,
  revisarApiKey(),
  autorizarToken,
  limitePeticionesDiarias,
  verificarPermisos(PERMISOS.ELIMINAR_USUARIOS),
  controlador.eliminarUsuario
);

module.exports = ruteador;
