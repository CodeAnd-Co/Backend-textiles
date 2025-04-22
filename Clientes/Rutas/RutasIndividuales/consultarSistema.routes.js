const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/cli/ctrl/consultarSistema.controller");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");
const autorizarToken = require("@altertex/util/inter/autorizarToken");
const verificarPermisos = require("@altertex/util/inter/verificarPermisos");

const PERMISOS = require("@altertex/util/const/permisos");
const RUTAS = require("@altertex/util/const/rutas");

/**
 * @swagger
 * /api/clientes/consultar-sistema:
 *   post:
 *     summary: Consultar sistema administrativo del cliente y emitir nuevo token
 *     tags: [Clientes]
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idCliente
 *             properties:
 *               idCliente:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Consulta exitosa y nuevo token emitido
 *         headers:
 *           Set-Cookie:
 *             description: Token JWT actualizado para el cliente seleccionado
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Sistema consultado exitosamente.
 *       400:
 *         description: Formato de ID de cliente inválido
 *       401:
 *         description: No autorizado, token o API key inválida
 *       403:
 *         description: El usuario no tiene acceso a ese cliente
 *       404:
 *         description: El cliente no tiene sistema asociado
 *       500:
 *         description: Error interno al consultar el sistema
 */

ruteador.post(
  RUTAS.CLIENTES.CONSULTAR_SISTEMA,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.CONSULTAR_SISTEMA_ADMINISTRATIVO),
  controlador.consultarSistema
);

module.exports = ruteador;
