/**
 * RF15 - Elimina Cliente - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF15
 */

/**
 * @swagger
 * /api/clientes/eliminar/{idCliente}:
 *   delete:
 *     summary: Eliminar un cliente registrado
 *     tags: [Clientes]
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idCliente
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente que se desea eliminar
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Cliente eliminado
 *       400:
 *         description: No se puede eliminar el cliente debido a restricciones (ej. registros asociados)
 *       401:
 *         description: No autorizado, token o API key inválida
 *       403:
 *         description: No tiene permisos para eliminar clientes
 *       500:
 *         description: Error interno al eliminar el cliente
 */

const express = require("express");
const ruteador = express.Router();
const controlador = require("@altertex/cli/ctrl/eliminarCliente.controller");
const revisarApiKey = require("@altertex/util/inter/revisarApiKey");
const autorizarToken = require("@altertex/util/inter/autorizarToken");
const verificarPermisos = require("@altertex/util/inter/verificarPermisos");
const validarYSanitizar = require('@altertex/util/inter/validarYSanitizar');

const PERMISOS = require("@altertex/util/const/permisos");
const RUTAS = require("@altertex/util/const/rutas");

ruteador.post(
  RUTAS.CLIENTES.ELIMINAR_CLIENTE,
  validarYSanitizar,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.ELIMINAR_CLIENTE),
  controlador.eliminarCliente
);

module.exports = ruteador;