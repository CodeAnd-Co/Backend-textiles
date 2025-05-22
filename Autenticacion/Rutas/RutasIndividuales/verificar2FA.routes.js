const express = require('express');
const ruteador = express.Router();

const controlador = require('@altertex/aut/ctrl/verificar2FA.controller');

const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * RF## - Verificar 2FA para Superadmin
 */

/**
 * @swagger
 * /api/seguridad/superadmin/verificar-2fa:
 *   post:
 *     summary: Verifica el código 2FA proporcionado por el Superadmin.
 *     tags: [Seguridad]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idUsuario
 *               - codigo
 *             properties:
 *               idUsuario:
 *                 type: integer
 *                 example: 1
 *               codigo:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Código 2FA verificado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Autenticación 2FA exitosa.
 *       400:
 *         description: Código inválido o ya expirado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Código 2FA inválido.
 *       401:
 *         description: Token no autorizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Token no autorizado.
 *       403:
 *         description: Usuario no autorizado para verificar 2FA.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Usuario no autorizado para verificar 2FA.
 *       500:
 *         description: Error al verificar el código 2FA.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error interno al verificar el código.
 */

ruteador.post(
  RUTAS.AUTENTICACION.VERIFICAR_2FA,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.VERIFICAR_2FA_SUPERADMIN),
  controlador.verificar2FA
);

module.exports = ruteador;