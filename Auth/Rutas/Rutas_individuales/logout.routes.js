const express = require("express");
const revisarApiKey = require("../../../util/middlewares/revisarApiKey");
const ruteador = express.Router();
const controlador = require("../../Controladores/logout.controller");

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Cerrar sesión de usuario
 *     tags: [Autenticación]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         required: true
 *         schema:
 *           type: string
 *         description: Clave API para acceder al endpoint
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Sesión cerrada con éxito
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
 */

ruteador.post("/logout", revisarApiKey("x-api-key"), controlador.logout);

module.exports = ruteador;
