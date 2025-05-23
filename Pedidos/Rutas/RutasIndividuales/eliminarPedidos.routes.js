//RF[63] Elimina pedido - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF63]

const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/pedidos/ctrl/eliminarPedidos.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * @swagger
 * /api/pedidos/eliminar:
 *   post:
 *     summary: Eliminar pedidos.
 *     description: Elimina uno o varios pedidos de la base de datos. Requiere autenticación y permisos específicos.
 *     tags:
 *       - Pedidos
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
 *               idsPedido:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [101, 102, 103]
 *     responses:
 *       200:
 *         description: Pedidos eliminados exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Pedidos eliminados correctamente.
 *       404:
 *         description: Pedidos no encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: No se encontraron los pedidos especificados.
 *       500:
 *         description: Error interno al eliminar los pedidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error al eliminar los pedidos.
 */

ruteador.post(
  RUTAS.PEDIDOS.ELIMINAR_PEDIDO,
  revisarApiKey(),
  autorizarToken,
  limitePeticionesDiarias,
  verificarPermisos(PERMISOS.ELIMINAR_PEDIDO),
  controlador.eliminarPedido
);

module.exports = ruteador;
