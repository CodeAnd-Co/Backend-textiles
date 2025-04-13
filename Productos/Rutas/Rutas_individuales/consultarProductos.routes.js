const express = require("express");
const revisarApiKey = require("../../../util/middlewares/revisarApiKey");
const ruteador = express.Router();
const controlador = require("../../Controladores/consultarProductos.controller");

/**
 * @swagger
 * /:
 *   post:
 *     summary: Consultar productos
 *     tags: [Autenticación]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: ?????
 *       content:
 *         application/json:
 *           schema:
 *             type: object

 *     responses:
 *       200:
 *         description: Consulta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Consulta de productos exitosa
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Credenciales inválidas, no tiene el permiso necesario
 *       500:
 *         description: Error al obtener los productos
 */

ruteador.get(
  "/productos/lista",
  revisarApiKey("x-api-key", "Api key invalida"),
  controlador.consultarProductosController
);

module.exports = ruteador;
