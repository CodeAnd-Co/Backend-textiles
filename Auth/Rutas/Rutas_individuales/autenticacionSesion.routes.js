/**
 * @file rutasAuth.js
 * @description Define rutas relacionadas con autenticación protegidas por API key y token JWT.
 */

const express = require("express");
const revisarApiKey = require("../../../util/middlewares/revisarApiKey");
const autorizarToken = require("../../../util/middlewares/autorizarToken");

const ruteador = express.Router();

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Obtener usuario autenticado
 *     tags: [Autenticación]
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         required: true
 *         schema:
 *           type: string
 *         description: Clave API para acceder al endpoint
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer tu_token
 *         description: Token JWT en formato Bearer
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: Datos del usuario extraídos del token
 *       400:
 *         description: API key inválida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Api key invalida
 *       401:
 *         description: Token inválido o no proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Token inválido o no proporcionado
 */

ruteador.get(
  "/auth/me",
  revisarApiKey("x-api-key", "Api key invalida"),
  autorizarToken,
  (req, res) => {
    res.json({ user: req.user });
  }
);

module.exports = ruteador;
