//RF27 Consulta Lista de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF27
const express = require('express');
const ruteador = express.Router();
const controlador = require('@altertex/pro/ctrl/consultarProductos.controller');
const revisarApiKey = require('@altertex/util/inter/revisarApiKey');
const autorizarToken = require('@altertex/util/inter/autorizarToken');
const verificarPermisos = require('@altertex/util/inter/verificarPermisos');
const limitePeticionesDiarias = require('@altertex/util/inter/limitePeticiones');

const PERMISOS = require('@altertex/util/const/permisos');
const RUTAS = require('@altertex/util/const/rutas');

/**
 * @swagger
 * /api/productos/consultar-lista:
 *   post:
 *     summary: Consultar productos
 *     tags: [Productos]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filtros:
 *                 type: object
 *                 description: Opcional, filtros para la búsqueda
 *     responses:
 *       200:
 *         description: Consulta de productos exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Lista de productos consultada correctamente
 *                 productos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idProducto:
 *                         type: integer
 *                         example: 1
 *                       nombreComun:
 *                         type: string
 *                         example: Camiseta básica
 *                       claveProducto:
 *                         type: string
 *                         example: CAM-001
 *                       activo:
 *                         type: boolean
 *                         example: true
 *       401:
 *         description: No autorizado - Credenciales inválidas o sin permisos
 *       500:
 *         description: Error del servidor al obtener los productos
 */

ruteador.post(
  RUTAS.PRODUCTOS.CONSULTAR_LISTA,
  revisarApiKey(),
  autorizarToken,
  limitePeticionesDiarias,
  verificarPermisos(PERMISOS.CONSULTAR_PRODUCTOS),
  controlador.consultarProductos
);

module.exports = ruteador;
