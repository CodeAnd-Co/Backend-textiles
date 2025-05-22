const express = require('express');
const ruteador = express.Router();

const controlador = require('@altertex/aut/ctrl/activar2FA.controller');

const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * RF## - Activar 2FA para Superadmin
 */

/**
 * @swagger
 * /api/seguridad/superadmin/activar-2fa:
 *   post:
 *     summary: Activa autenticación 2FA para un Superadmin autorizado.
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
 *               - nombre
 *               - correo
 *             properties:
 *               idUsuario:
 *                 type: integer
 *                 example: 1
 *               nombre:
 *                 type: string
 *                 example: Maria González
 *               correo:
 *                 type: string
 *                 format: email
 *                 example: maria.gonzalez@example.com
 *     responses:
 *       200:
 *         description: 2FA activado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Se generó el QR de activación.
 *                 qrCode:
 *                   type: string
 *                   format: byte
 *                   example: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
 *       400:
 *         description: Solicitud incorrecta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error al activar autenticación 2FA.
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
 *         description: Usuario no autorizado para activar 2FA.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Usuario no autorizado para activar 2FA.
 *       500:
 *         description: Error al generar el secreto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error al generar el secreto.
 */

ruteador.post(
  RUTAS.AUTENTICACION.ACTIVAR_2FA,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.ACTIVAR_2FA_SUPERADMIN),
  controlador.activar2FA
);

module.exports = ruteador;