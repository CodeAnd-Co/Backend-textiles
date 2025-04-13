const express = require("express");
const ruteador = express.Router();
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");
const autorizarToken = require("@altertex/util/inter/autorizarToken");

const RUTAS = require("@altertex/util/const/rutas");

/**
 * @swagger
 * /autenticacion/usuario-autenticado:
 *   get:
 *     summary: Obtiene los datos del usuario autenticado mediante un token JWT.
 *     tags:
 *       - Autenticación
 *     security:
 *       - ApiKeyAuth: []  # Protegido por API key
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   example:
 *                     correo: usuario@correo.com
 *                     permisos:
 *                       - ADMIN
 *                       - EDITOR
 *       401:
 *         description: Token no proporcionado, expirado o inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Token no proporcionado o inválido.
 *       500:
 *         description: Error al validar el token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error interno al validar el token.
 */

ruteador.get(
  RUTAS.AUTENTICACION.USUARIO_AUTENTICADO,
  revisarApiKey(),
  autorizarToken,
  (req, res) => {
    res.json({ user: req.user });
  }
);

module.exports = ruteador;
