const express = require('express');
const ruteador = express.Router();
const RUTAS = require('@altertex/util/const/rutas');
const PERMISOS = require('@altertex/util/const/permisos');
const controlador = require('@altertex/pedidos/ctrl/obtenerPedidos.controller');

const autorizarToken = require('@altertex/util/inter/autorizarToken');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');

/**
 * RF60 - Consulta Lista de Pedidos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF60
 * @swagger
 * /api/pedidos/consultar-lista:
 *   get:
 *     summary: Consulta la lista de pedidos del cliente autenticado
 *     tags:
 *       - Pedidos
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Lista de pedidos obtenida exitosamente.
 *                 pedidos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idPedido:
 *                         type: integer
 *                         example: 1
 *                       nombreEmpleado:
 *                         type: string
 *                         example: Sofía Navarro
 *                       fechaOrden:
 *                         type: string
 *                         format: date
 *                         example: 2025-03-20
 *                       estatusPedido:
 *                         type: string
 *                         example: En Proceso
 *                       precioTotal:
 *                         type: string
 *                         example: "450.00"
 *                       estatusPago:
 *                         type: string
 *                         example: Pendiente
 *                       estatusEnvio:
 *                         type: string
 *                         example: En Proceso
 *       204:
 *         description: No se encontraron pedidos para el cliente.
 *       403:
 *         description: No tiene permiso para consultar pedidos.
 *       500:
 *         description: Error al consultar la lista de pedidos.
 */
ruteador.get(
  RUTAS.PEDIDOS.CONSULTAR_LISTA,
  revisarApiKey(),
  autorizarToken,
  verificarPermisos(PERMISOS.CONSULTAR_PEDIDOS),
  controlador.obtenerLista
);

module.exports = ruteador;
